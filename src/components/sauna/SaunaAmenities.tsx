import { Check } from "lucide-react";

interface SaunaAmenitiesProps {
  amenities: string[];
}

export const SaunaAmenities = ({ amenities }: SaunaAmenitiesProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Amenities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {amenities.map((amenity) => (
          <div key={amenity} className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500" />
            <span>{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};