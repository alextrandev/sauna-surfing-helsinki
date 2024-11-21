import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
  );
};