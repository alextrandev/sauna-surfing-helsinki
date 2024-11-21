import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, Users, Info } from "lucide-react";

interface MessageInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  messageType: "chat" | "tip" | "request";
  setMessageType: (type: "chat" | "tip" | "request") => void;
  handleSendMessage: () => void;
}

export const MessageInput = ({
  newMessage,
  setNewMessage,
  messageType,
  setMessageType,
  handleSendMessage,
}: MessageInputProps) => {
  return (
    <div className="flex gap-2 p-4 border-t">
      <Select value={messageType} onValueChange={(value: "chat" | "tip" | "request") => setMessageType(value)}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Message type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="chat">
            <span className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Chat
            </span>
          </SelectItem>
          <SelectItem value="tip">
            <span className="flex items-center gap-2">
              <Info className="w-4 h-4" />
              Tip
            </span>
          </SelectItem>
          <SelectItem value="request">
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Request
            </span>
          </SelectItem>
        </SelectContent>
      </Select>
      <Input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1"
        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
      />
      <Button onClick={handleSendMessage}>Send</Button>
    </div>
  );
};