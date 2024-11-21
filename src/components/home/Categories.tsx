import { Button } from "@/components/ui/button";

const Categories = () => {
  return (
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
  );
};

export default Categories;