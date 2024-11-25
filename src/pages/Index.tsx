import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import SaunaGlobalChat from "@/components/home/SaunaGlobalChat";
import SearchBar from "@/components/home/SearchBar";
import CategorySlider from "@/components/home/CategorySlider";
import SaunaList from "@/components/home/SaunaList";
import { saunas } from "@/data/saunas";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      <div className="container mx-auto px-4 pt-8">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <CategorySlider />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SaunaList saunas={saunas} searchQuery={searchQuery} />
          </div>
          
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-semibold mb-6">Sauna Community</h2>
            <SaunaGlobalChat />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;