export interface ChatUser {
  name: string;
  avatar: string;
  experience?: string;
}

export interface ChatMessage {
  id: string;
  user: ChatUser;
  message: string;
  type: "chat" | "tip" | "request";
  timestamp: Date;
}