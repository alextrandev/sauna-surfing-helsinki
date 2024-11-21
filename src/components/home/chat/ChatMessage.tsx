import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChatMessageProps {
  message: {
    id: string;
    user: {
      name: string;
      avatar: string;
      experience?: string;
    };
    message: string;
    type: "chat" | "tip" | "request";
    timestamp: Date;
  };
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const { toast } = useToast();

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
    <div className="flex gap-3">
      <Avatar>
        <AvatarImage src={message.user.avatar} alt={message.user.name} />
        <AvatarFallback>{message.user.name.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{message.user.name}</span>
          {message.type === "tip" && (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
              {message.user.experience}
            </span>
          )}
          {message.type === "request" && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
              Looking for buddies
            </span>
          )}
          <span className="text-xs text-muted-foreground">
            {message.timestamp.toLocaleTimeString()}
          </span>
        </div>
        <p className={`text-sm mt-1 ${
          message.type === "tip" ? "bg-green-50" : 
          message.type === "request" ? "bg-blue-50" : ""
        } p-2 rounded-md`}>
          {getMessageIcon(message.type)} {message.message}
        </p>
        {message.type === "request" && (
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
        )}
      </div>
    </div>
  );
};