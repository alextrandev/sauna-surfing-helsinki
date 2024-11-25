import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sauna } from "./SaunaCard";
import SaunaCard from "./SaunaCard";
import { 
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface SaunaListProps {
  saunas: Sauna[];
  searchQuery: string;
}

const ITEMS_PER_PAGE = 6;

const SaunaList = ({ saunas, searchQuery }: SaunaListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // Filter saunas based on search query
  const filteredSaunas = saunas.filter((sauna) =>
    sauna.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sauna.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sauna.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSaunas.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedSaunas = filteredSaunas.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSaunaClick = (id: string) => {
    navigate(`/sauna/${id}`);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paginatedSaunas.map((sauna, index) => (
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
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default SaunaList;