import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  message: string;
  timestamp: Date;
}

const mockMessages: ChatMessage[] = [
  {
    id: "1",
    user: {
      name: "Matti V.",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100",
    },
    message: "Anyone interested in an evening session?",
    timestamp: new Date("2024-02-20T18:00:00"),
  },
  {
    id: "2",
    user: {
      name: "Laura K.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    },
    message: "I'm in! What time were you thinking?",
    timestamp: new Date("2024-02-20T18:05:00"),
  },
];

export const SaunaChatroom = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      user: {
        name: "You",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100",
      },
      message: newMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, message]);
    setNewMessage("");
    
    toast({
      title: "Message sent",
      description: "Your message has been sent to the group.",
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Chat Room</h2>
      <Card>
        <CardContent className="p-4">
          <ScrollArea className="h-[400px] mb-4">
            <div className="space-y-4">
              {messages.map((msg) => (
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
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};