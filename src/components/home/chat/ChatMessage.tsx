import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MessageTypeBadge } from "./MessageTypeBadge";
import type { ChatMessage as ChatMessageType } from "@/types/chat";

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const { toast } = useToast();

  return (
    <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
      <Avatar className="h-10 w-10">
        <AvatarImage src={message.user.avatar} alt={message.user.name} />
        <AvatarFallback>{message.user.name.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{message.user.name}</span>
          {message.user.experience && (
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
              {message.user.experience}
            </span>
          )}
          <MessageTypeBadge type={message.type} />
          <span className="text-xs text-muted-foreground ml-auto">
            {message.timestamp.toLocaleTimeString()}
          </span>
        </div>
        <p className="text-sm text-gray-700">{message.message}</p>
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