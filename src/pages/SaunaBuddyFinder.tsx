import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, Calendar, Users } from "lucide-react";
import { BackButton } from "@/components/ui/back-button";

interface SaunaBuddy {
  id: number;
  name: string;
  location: string;
  preferences: string[];
  availability: string;
  experience: string;
  avatar: string;
}

const mockBuddies: SaunaBuddy[] = [
  {
    id: 1,
    name: "Matti V.",
    location: "Kallio, Helsinki",
    preferences: ["Traditional", "Smoke Sauna"],
    availability: "Weekends",
    experience: "Expert",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100"
  },
  {
    id: 2,
    name: "Laura K.",
    location: "Töölö, Helsinki",
    preferences: ["Infrared", "Social"],
    availability: "Evenings",
    experience: "Intermediate",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
  },
  {
    id: 3,
    name: "Mikko R.",
    location: "Punavuori, Helsinki",
    preferences: ["Traditional", "Wellness"],
    availability: "Mornings",
    experience: "Beginner",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100"
  }
];

const SaunaBuddyFinder = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const filteredBuddies = mockBuddies.filter(buddy =>
    buddy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    buddy.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    buddy.preferences.some(pref => pref.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleConnect = (buddy: SaunaBuddy) => {
    toast({
      title: "Connection Request Sent!",
      description: `We've notified ${buddy.name} of your interest in connecting.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <BackButton />
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Find a Sauna Buddy</h1>
          <p className="text-muted-foreground mb-6">
            Connect with fellow sauna enthusiasts and share the experience together
          </p>
          
          <div className="relative">
            <Input
              type="text"
              placeholder="Search by name, location, or preferences..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className="grid gap-6">
          {filteredBuddies.map((buddy) => (
            <Card key={buddy.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <img
                    src={buddy.avatar}
                    alt={buddy.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{buddy.name}</h3>
                        <div className="flex items-center gap-2 text-muted-foreground mb-2">
                          <MapPin className="w-4 h-4" />
                          <span>{buddy.location}</span>
                        </div>
                      </div>
                      <Button onClick={() => handleConnect(buddy)}>
                        Connect
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {buddy.preferences.map((pref) => (
                        <Badge key={pref} variant="secondary">
                          {pref}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{buddy.availability}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{buddy.experience}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SaunaBuddyFinder;
