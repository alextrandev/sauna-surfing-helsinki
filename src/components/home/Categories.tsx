import { Button } from "@/components/ui/button";

interface CategoriesProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const Categories = ({ selectedCategory, onCategoryChange }: CategoriesProps) => {
  const categories = ["All", "Traditional", "Smoke", "Infrared", "Modern"];

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
      {categories.map((category) => (
        <Button
          key={category}
          variant={category === selectedCategory ? "default" : "outline"}
          className="rounded-full whitespace-nowrap"
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default Categories;