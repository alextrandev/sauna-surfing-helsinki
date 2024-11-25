import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as Icons from "lucide-react";
import { useRef } from "react";
import { categories } from "./Categories";

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
        {categories.map((category) => {
          const IconComponent = Icons[category.icon as keyof typeof Icons];
          return (
            <Button
              key={category.value}
              variant="outline"
              className="flex-shrink-0 rounded-full gap-2"
            >
              {IconComponent && <IconComponent className="w-4 h-4" />}
              {category.label}
            </Button>
          );
        })}
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