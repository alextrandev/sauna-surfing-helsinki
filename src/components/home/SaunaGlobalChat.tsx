import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatMessage } from "./chat/ChatMessage";
import { MessageInput } from "./chat/MessageInput";

interface ChatMessage {
  id: string;
  user: {
    name: string;
    avatar: string;
    experience: string;
  };
  message: string;
  type: "chat" | "tip" | "request";
  timestamp: Date;
}

const mockMessages: ChatMessage[] = [
  {
    id: "1",
    user: {
      name: "Matti V.",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100",
      experience: "Expert"
    },
    message: "Anyone interested in an evening session at the smoke sauna?",
    type: "request",
    timestamp: new Date("2024-02-20T18:00:00"),
  },
  {
    id: "2",
    user: {
      name: "Laura K.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      experience: "Intermediate"
    },
    message: "Pro tip: Always take a cold plunge after the sauna for maximum benefits!",
    type: "tip",
    timestamp: new Date("2024-02-20T18:05:00"),
  },
  {
    id: "3",
    user: {
      name: "Mikko H.",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
      experience: "Expert"
    },
    message: "Looking for sauna buddies this weekend at my traditional smoke sauna!",
    type: "request",
    timestamp: new Date("2024-02-20T18:10:00"),
  },
  {
    id: "4",
    user: {
      name: "Anna S.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      experience: "Expert"
    },
    message: "Tip: Hydration is key! Drink plenty of water before and after your sauna session.",
    type: "tip",
    timestamp: new Date("2024-02-20T18:15:00"),
  },
  {
    id: "5",
    user: {
      name: "Juha P.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      experience: "Intermediate"
    },
    message: "Anyone up for a morning sauna session tomorrow at 7 AM?",
    type: "request",
    timestamp: new Date("2024-02-20T18:20:00"),
  }
];

const SaunaGlobalChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [messageType, setMessageType] = useState<"chat" | "tip" | "request">("chat");
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      user: {
        name: "You",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100",
        experience: "Intermediate"
      },
      message: newMessage,
      type: messageType,
      timestamp: new Date(),
    };

    setMessages([...messages, message]);
    setNewMessage("");
    
    toast({
      title: "Message sent",
      description: messageType === "request" 
        ? "Your sauna buddy request has been sent!" 
        : "Your message has been sent to the community.",
    });
  };

  return (
    <div className="space-y-4">
      <Card className="glass">
        <CardContent className="p-4">
          <Tabs defaultValue="chat" className="mb-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="tips">Tips</TabsTrigger>
              <TabsTrigger value="requests">Requests</TabsTrigger>
            </TabsList>
            {["chat", "tips", "requests"].map((tab) => (
              <TabsContent key={tab} value={tab}>
                <ScrollArea className="h-[400px] pr-4">
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
          </Tabs>
          <MessageInput
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            messageType={messageType}
            setMessageType={setMessageType}
            handleSendMessage={handleSendMessage}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default SaunaGlobalChat;