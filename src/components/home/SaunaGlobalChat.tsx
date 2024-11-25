import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatMessage } from "./chat/ChatMessage";
import { MessageInput } from "./chat/MessageInput";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth";
import type { ChatMessage as ChatMessageType } from "@/types/chat";

interface MessageResponse {
  id: string;
  message: string;
  type: string;
  created_at: string;
  profiles: {
    username: string | null;
    avatar_url: string | null;
    experience: string | null;
  };
}

const fetchMessages = async () => {
  const { data, error } = await supabase
    .from('messages')
    .select(`
      id,
      message,
      type,
      created_at,
      profiles (
        username,
        avatar_url,
        experience
      )
    `)
    .order('created_at', { ascending: true })
    .limit(50);

  if (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }

  if (!data) return [];

  return data.map((msg: MessageResponse) => ({
    id: msg.id,
    message: msg.message,
    type: msg.type as "chat" | "tip" | "request",
    timestamp: new Date(msg.created_at),
    user: {
      name: msg.profiles?.username || 'Anonymous',
      avatar: msg.profiles?.avatar_url || '',
      experience: msg.profiles?.experience || 'Beginner'
    }
  }));
};

const SaunaGlobalChat = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messageType, setMessageType] = useState<"chat" | "tip" | "request">("chat");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user, isAuthenticated } = useAuth();

  const { data: messages = [] } = useQuery({
    queryKey: ['messages'],
    queryFn: fetchMessages,
    refetchInterval: 5000,
    initialData: []
  });

  const handleSendMessage = async () => {
    if (!newMessage.trim()) {
      toast({
        title: "Error",
        description: "Message cannot be empty",
        variant: "destructive"
      });
      return;
    }

    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to send messages",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          message: newMessage.trim(),
          type: messageType,
          user_id: user.id
        });

      if (error) throw error;

      setNewMessage("");
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      
      toast({
        title: "Message sent",
        description: messageType === "request" 
          ? "Your sauna buddy request has been sent!" 
          : "Your message has been sent to the community.",
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-200">
      <CardContent className="p-0">
        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="w-full rounded-none">
            <TabsTrigger value="chat" className="flex-1">Chat</TabsTrigger>
            <TabsTrigger value="tips" className="flex-1">Tips</TabsTrigger>
            <TabsTrigger value="requests" className="flex-1">Requests</TabsTrigger>
          </TabsList>
          
          {["chat", "tips", "requests"].map((tab) => (
            <TabsContent key={tab} value={tab} className="m-0">
              <ScrollArea className="h-[500px] p-4">
                <div className="space-y-4">
                  {messages
                    .filter(msg => 
                      tab === "chat" ? msg.type === "chat" :
                      tab === "tips" ? msg.type === "tip" :
                      msg.type === "request"
                    )
                    .map((msg) => (
                      <ChatMessage key={msg.id} message={msg} />
                    ))}
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
          
          <MessageInput
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            messageType={messageType}
            setMessageType={setMessageType}
            handleSendMessage={handleSendMessage}
          />
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SaunaGlobalChat;