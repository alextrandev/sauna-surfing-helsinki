import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import SaunaCard, { Sauna } from "@/components/home/SaunaCard";

const saunas: Sauna[] = [
  {
    id: 1,
    title: "Traditional Smoke Sauna Experience",
    location: "Kallio, Helsinki",
    price: 85,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=60",
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
    image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&auto=format&fit=crop&q=60",
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
    image: "https://images.unsplash.com/photo-1543489822-c49534f3271f?w=800&auto=format&fit=crop&q=60",
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
    image: "https://images.unsplash.com/photo-1515696955266-4f67e13219e8?w=800&auto=format&fit=crop&q=60",
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
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&auto=format&fit=crop&q=60",
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
    image: "https://images.unsplash.com/photo-1545579133-99bb5ab189bd?w=800&auto=format&fit=crop&q=60",
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
    image: "https://images.unsplash.com/photo-1581316452165-6fe0b6a2a9c0?w=800&auto=format&fit=crop&q=60",
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
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&auto=format&fit=crop&q=60",
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
      
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6">Featured Saunas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {saunas.map((sauna, index) => (
            <SaunaCard
              key={sauna.id}
              sauna={sauna}
              onClick={handleSaunaClick}
              index={index}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
