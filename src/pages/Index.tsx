import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import SaunaCard, { Sauna } from "@/components/home/SaunaCard";
import SaunaGlobalChat from "@/components/home/SaunaGlobalChat";

const saunas: Sauna[] = [
  {
    id: 1,
    title: "Traditional Smoke Sauna Experience",
    location: "Kallio, Helsinki",
    price: 85,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800",
    type: "Smoke",
    buddies: 3,
    nextSession: "Today at 18:00"
  },
  {
    id: 2,
    title: "Modern Urban Sauna & Lounge",
    location: "Töölö, Helsinki",
    price: 75,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800",
    type: "Modern",
    buddies: 2,
    nextSession: "Tomorrow at 16:00"
  },
  {
    id: 3,
    title: "Waterfront Wood-Burning Sauna",
    location: "Vuosaari, Helsinki",
    price: 95,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800",
    type: "Traditional",
    buddies: 4,
    nextSession: "Today at 20:00"
  },
  {
    id: 4,
    title: "Luxury Wellness Sauna Suite",
    location: "Kamppi, Helsinki",
    price: 120,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
    type: "Modern",
    buddies: 1,
    nextSession: "Tomorrow at 14:00"
  },
  {
    id: 5,
    title: "Historic Public Sauna",
    location: "Kruununhaka, Helsinki",
    price: 65,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800",
    type: "Traditional",
    buddies: 0,
    nextSession: null
  },
  {
    id: 6,
    title: "Eco-Friendly Forest Sauna",
    location: "Keskuspuisto, Helsinki",
    price: 90,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=800",
    type: "Smoke",
    buddies: 5,
    nextSession: "Today at 19:00"
  },
  {
    id: 7,
    title: "Rooftop Panorama Sauna",
    location: "Kalasatama, Helsinki",
    price: 110,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42f?w=800",
    type: "Modern",
    buddies: 2,
    nextSession: "Tomorrow at 15:00"
  },
  {
    id: 8,
    title: "Traditional Neighborhood Sauna",
    location: "Vallila, Helsinki",
    price: 70,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800",
    type: "Traditional",
    buddies: 1,
    nextSession: null
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSaunaClick = (saunaId: number) => {
    navigate(`/sauna/${saunaId}`);
  };

  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Categories />
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-semibold mb-6">Sauna Community</h2>
            <SaunaGlobalChat />
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-6">Featured Saunas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {saunas.map((sauna, index) => (
                <SaunaCard
                  key={sauna.id}
                  sauna={sauna}
                  onClick={handleSaunaClick}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;