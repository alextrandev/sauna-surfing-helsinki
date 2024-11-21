import { MessageCircle, Users, Info } from "lucide-react";

interface MessageTypeBadgeProps {
  type: "chat" | "tip" | "request";
}

export const MessageTypeBadge = ({ type }: MessageTypeBadgeProps) => {
  switch (type) {
    case "request":
      return (
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full flex items-center gap-1">
          <Users className="w-3 h-3" />
          Looking for buddies
        </span>
      );
    case "tip":
      return (
        <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full flex items-center gap-1">
          <Info className="w-3 h-3" />
          Pro Tip
        </span>
      );
    default:
      return (
        <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full flex items-center gap-1">
          <MessageCircle className="w-3 h-3" />
          Chat
        </span>
      );
  }
};