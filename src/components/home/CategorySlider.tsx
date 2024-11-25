import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

const categories = [
  { id: "cabins", label: "Cabins", icon: "🏡" },
  { id: "icons", label: "Icons", icon: "🎫" },
  { id: "lakefront", label: "Lakefront", icon: "🌊" },
  { id: "amazing-views", label: "Amazing views", icon: "🏔️" },
  { id: "mansions", label: "Mansions", icon: "🏰" },
  { id: "tiny-homes", label: "Tiny homes", icon: "🏠" },
  { id: "omg", label: "OMG!", icon: "👽" },
  { id: "castles", label: "Castles", icon: "🏰" },
  { id: "beachfront", label: "Beachfront", icon: "🏖️" },
  { id: "luxe", label: "Luxe", icon: "✨" },
  { id: "tropical", label: "Tropical", icon: "🌴" },
  { id: "countryside", label: "Countryside", icon: "🌾" },
  { id: "amazing-pools", label: "Amazing pools", icon: "🏊‍♂️" },
];

const CategorySlider = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto mb-8">
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
      >
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="outline"
            className="flex-shrink-0 rounded-full gap-2"
          >
            <span>{category.icon}</span>
            {category.label}
          </Button>
        ))}
      </div>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-white shadow-md"
        onClick={() => scroll("left")}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white shadow-md"
        onClick={() => scroll("right")}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default CategorySlider;