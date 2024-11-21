import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Users, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  const getMessageIcon = (type: string) => {
    switch (type) {
      case "request":
        return <Users className="w-4 h-4 text-blue-500" />;
      case "tip":
        return <Info className="w-4 h-4 text-green-500" />;
      default:
        return <MessageSquare className="w-4 h-4 text-gray-500" />;
    }
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
            <TabsContent value="chat">
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {messages.filter(msg => msg.type === "chat").map((msg) => (
                    <div key={msg.id} className="flex gap-3">
                      <Avatar>
                        <AvatarImage src={msg.user.avatar} alt={msg.user.name} />
                        <AvatarFallback>{msg.user.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{msg.user.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {msg.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-sm mt-1">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="tips">
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {messages.filter(msg => msg.type === "tip").map((msg) => (
                    <div key={msg.id} className="flex gap-3">
                      <Avatar>
                        <AvatarImage src={msg.user.avatar} alt={msg.user.name} />
                        <AvatarFallback>{msg.user.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{msg.user.name}</span>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                            {msg.user.experience}
                          </span>
                        </div>
                        <p className="text-sm mt-1 bg-green-50 p-2 rounded-md">
                          {getMessageIcon("tip")} {msg.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="requests">
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {messages.filter(msg => msg.type === "request").map((msg) => (
                    <div key={msg.id} className="flex gap-3">
                      <Avatar>
                        <AvatarImage src={msg.user.avatar} alt={msg.user.name} />
                        <AvatarFallback>{msg.user.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{msg.user.name}</span>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                            Looking for buddies
                          </span>
                        </div>
                        <p className="text-sm mt-1 bg-blue-50 p-2 rounded-md">
                          {getMessageIcon("request")} {msg.message}
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-2"
                          onClick={() => toast({
                            title: "Request sent!",
                            description: "We'll notify you when they respond.",
                          })}
                        >
                          Join Session
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
            </div>
            <select 
              className="px-3 py-2 border rounded-md"
              value={messageType}
              onChange={(e) => setMessageType(e.target.value as "chat" | "tip" | "request")}
            >
              <option value="chat">Chat</option>
              <option value="tip">Tip</option>
              <option value="request">Request</option>
            </select>
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SaunaGlobalChat;