import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import SaunaCard from "@/components/home/SaunaCard";
import SaunaGlobalChat from "@/components/home/SaunaGlobalChat";
import { supabase } from "@/integrations/supabase/client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useToast } from "@/hooks/use-toast";

const ITEMS_PER_PAGE = 6;

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: saunasData, isLoading } = useQuery({
    queryKey: ["saunas", selectedCategory, currentPage],
    queryFn: async () => {
      try {
        // First, get the saunas with basic information
        let query = supabase.from("saunas").select("*", { count: "exact" });

        if (selectedCategory !== "All") {
          query = query.eq("type", selectedCategory);
        }

        const { data: saunas, error: saunasError, count } = await query
          .range((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE - 1)
          .order("created_at", { ascending: false });

        if (saunasError) throw saunasError;
        if (!saunas) return { saunas: [], total: 0 };

        // Then, for each sauna, get the buddy count
        const saunasWithBuddies = await Promise.all(
          saunas.map(async (sauna) => {
            const { count: buddyCount } = await supabase
              .from("sauna_buddies")
              .select("*", { count: "exact" })
              .eq("sauna_id", sauna.id);

            return {
              id: sauna.id,
              title: sauna.title,
              location: sauna.location,
              price: Number(sauna.price),
              rating: Number(sauna.rating || 5),
              image: sauna.image || "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800",
              type: sauna.type,
              buddies: buddyCount || 0
            };
          })
        );

        return {
          saunas: saunasWithBuddies,
          total: count || 0
        };
      } catch (error) {
        console.error("Error fetching saunas:", error);
        toast({
          variant: "destructive",
          title: "Error fetching saunas",
          description: "Please try again later.",
        });
        return { saunas: [], total: 0 };
      }
    },
  });

  const handleSaunaClick = (saunaId: string) => {
    navigate(`/sauna/${saunaId}`);
  };

  const totalPages = Math.ceil((saunasData?.total || 0) / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen pb-20">
      <Navbar />
      <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <div className="container mx-auto px-4">
        <Categories 
          selectedCategory={selectedCategory} 
          onCategoryChange={category => {
            setSelectedCategory(category);
            setCurrentPage(1);
          }}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-semibold mb-6">Sauna Community</h2>
            <SaunaGlobalChat />
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-6">Featured Saunas</h2>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="h-[400px] bg-muted animate-pulse rounded-lg" />
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {saunasData?.saunas.map((sauna, index) => (
                    <SaunaCard
                      key={sauna.id}
                      sauna={sauna}
                      onClick={handleSaunaClick}
                      index={index}
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <Pagination className="mt-8">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                      {[...Array(totalPages)].map((_, i) => (
                        <PaginationItem key={i + 1}>
                          <PaginationLink
                            onClick={() => setCurrentPage(i + 1)}
                            isActive={currentPage === i + 1}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;