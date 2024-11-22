import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatMessage } from "./chat/ChatMessage";
import { MessageInput } from "./chat/MessageInput";
import type { ChatMessage as ChatMessageType } from "@/types/chat";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const fetchMessages = async () => {
  const { data, error } = await supabase
    .from('messages')
    .select(`
      id,
      message,
      type,
      created_at,
      profiles:user_id (
        username,
        avatar_url,
        experience
      )
    `)
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) throw error;

  return data.map(msg => ({
    id: msg.id,
    message: msg.message,
    type: msg.type,
    timestamp: new Date(msg.created_at),
    user: {
      name: msg.profiles.username,
      avatar: msg.profiles.avatar_url,
      experience: msg.profiles.experience
    }
  }));
};

const SaunaGlobalChat = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messageType, setMessageType] = useState<"chat" | "tip" | "request">("chat");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: messages = [] } = useQuery({
    queryKey: ['messages'],
    queryFn: fetchMessages,
    refetchInterval: 5000
  });

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const { error } = await supabase
      .from('messages')
      .insert({
        message: newMessage,
        type: messageType
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
      return;
    }

    setNewMessage("");
    queryClient.invalidateQueries({ queryKey: ['messages'] });
    
    toast({
      title: "Message sent",
      description: messageType === "request" 
        ? "Your sauna buddy request has been sent!" 
        : "Your message has been sent to the community.",
    });
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
              <ScrollArea className="h-[500px]">
                <div className="space-y-1">
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