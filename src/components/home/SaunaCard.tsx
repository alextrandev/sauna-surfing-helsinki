import { MapPin, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export interface Sauna {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  type: string;
  buddies: number;
  nextSession?: string;
}

interface SaunaCardProps {
  sauna: Sauna;
  onClick: (id: number) => void;
  index: number;
}

const SaunaCard = ({ sauna, onClick, index }: SaunaCardProps) => {
  const { toast } = useToast();

  const handleJoinBuddies = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "Joined sauna group!",
      description: `You've joined the group for ${sauna.title}. We'll notify you when the session is confirmed.`,
    });
  };

  return (
    <Card 
      className="overflow-hidden hover-scale animate-fade-up cursor-pointer" 
      style={{ animationDelay: `${0.1 * (index + 4)}s` }}
      onClick={() => onClick(sauna.id)}
    >
      <div className="aspect-[4/3] relative">
        <img
          src={sauna.image}
          alt={sauna.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {sauna.buddies > 0 && (
          <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span className="text-sm">{sauna.buddies}</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <Badge variant="secondary">{sauna.type}</Badge>
          <div className="flex items-center gap-1">
            <span className="text-sm">★</span>
            <span className="text-sm font-medium">{sauna.rating}</span>
          </div>
        </div>
        <h3 className="font-semibold mb-1">{sauna.title}</h3>
        <div className="flex items-center gap-1 text-muted-foreground mb-2">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{sauna.location}</span>
        </div>
        <Separator className="my-2" />
        <div className="flex items-center justify-between">
          <span className="font-semibold">{sauna.price}€</span>
          <span className="text-sm text-muted-foreground">per hour</span>
        </div>
        {sauna.nextSession && (
          <div className="mt-2 text-sm text-muted-foreground">
            Next session: {sauna.nextSession}
          </div>
        )}
        {sauna.buddies > 0 && (
          <Button 
            variant="secondary" 
            className="w-full mt-3"
            onClick={handleJoinBuddies}
          >
            Join {sauna.buddies} buddies
          </Button>
        )}
      </div>
    </Card>
  );
};

export default SaunaCard;