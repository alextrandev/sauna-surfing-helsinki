import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Hero = ({ searchQuery, setSearchQuery }: HeroProps) => {
  return (
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
  );
};

export default Hero;