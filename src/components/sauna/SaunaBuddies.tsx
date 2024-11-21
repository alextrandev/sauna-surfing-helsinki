import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SaunaBuddy {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline";
  experience: string;
}

const mockBuddies: SaunaBuddy[] = [
  {
    id: "1",
    name: "Matti V.",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100",
    status: "online",
    experience: "Expert"
  },
  {
    id: "2",
    name: "Laura K.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    status: "offline",
    experience: "Intermediate"
  },
  {
    id: "3",
    name: "Mikko R.",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100",
    status: "online",
    experience: "Beginner"
  }
];

export const SaunaBuddies = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Sauna Buddies</h2>
      <ScrollArea className="h-[300px] rounded-md border p-4">
        <div className="space-y-4">
          {mockBuddies.map((buddy) => (
            <Card key={buddy.id}>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={buddy.avatar} alt={buddy.name} />
                    <AvatarFallback>{buddy.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span 
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                      buddy.status === "online" ? "bg-green-500" : "bg-gray-300"
                    }`} 
                  />
                </div>
                <div>
                  <p className="font-medium">{buddy.name}</p>
                  <p className="text-sm text-muted-foreground">{buddy.experience}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};