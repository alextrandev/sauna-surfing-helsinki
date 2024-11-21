import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Sauna {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  type: string;
}

const saunas: Sauna[] = [
  {
    id: 1,
    title: "Traditional Wood-Burning Sauna",
    location: "Kallio, Helsinki",
    price: 65,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&auto=format&fit=crop&q=60",
    type: "Traditional"
  },
  {
    id: 2,
    title: "Modern Infrared Wellness Suite",
    location: "Töölö, Helsinki",
    price: 85,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=60",
    type: "Infrared"
  },
  {
    id: 3,
    title: "Lakeside Smoke Sauna",
    location: "Vuosaari, Helsinki",
    price: 95,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1543489822-c49534f3271f?w=800&auto=format&fit=crop&q=60",
    type: "Smoke"
  },
  {
    id: 4,
    title: "Urban Rooftop Sauna Experience",
    location: "Kamppi, Helsinki",
    price: 75,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1515696955266-4f67e13219e8?w=800&auto=format&fit=crop&q=60",
    type: "Modern"
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1800&auto=format&fit=crop&q=80"
            alt="Sauna hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-up">
            Find Your Perfect Sauna in Helsinki
          </h1>
          <p className="text-xl text-white/90 mb-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Experience authentic Finnish wellness, one sauna at a time
          </p>
          
          <div className="max-w-2xl mx-auto glass rounded-full p-2 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-gray-500 ml-3" />
              <Input
                type="text"
                placeholder="Search by location or sauna type..."
                className="border-0 focus-visible:ring-0 bg-transparent text-black placeholder:text-gray-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button className="rounded-full bg-sauna-ember hover:bg-sauna-ember/90">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex gap-4 overflow-x-auto pb-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          {["All", "Traditional", "Smoke", "Infrared", "Modern"].map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "outline"}
              className="rounded-full whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </section>

      {/* Featured Saunas */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6">Featured Saunas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {saunas.map((sauna, index) => (
            <Card key={sauna.id} className="overflow-hidden hover-scale animate-fade-up" style={{ animationDelay: `${0.1 * (index + 4)}s` }}>
              <div className="aspect-[4/3] relative">
                <img
                  src={sauna.image}
                  alt={sauna.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
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
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;