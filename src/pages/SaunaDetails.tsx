import { useParams } from "react-router-dom";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, Clock, Star } from "lucide-react";
import { SaunaReviews } from "@/components/sauna/SaunaReviews";
import { SaunaBookingForm } from "@/components/sauna/SaunaBookingForm";
import { SaunaAmenities } from "@/components/sauna/SaunaAmenities";
import { SaunaBuddies } from "@/components/sauna/SaunaBuddies";
import { SaunaChatroom } from "@/components/sauna/SaunaChatroom";
import { useToast } from "@/hooks/use-toast";

// Mock data - in a real app, this would come from an API
const saunas = [
  {
    id: "1",
    title: "Traditional Smoke Sauna Experience",
    location: "Kallio, Helsinki",
    price: 85,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&auto=format&fit=crop&q=60",
    type: "Smoke",
    description: "Experience the authentic Finnish smoke sauna tradition in the heart of Helsinki. Our carefully maintained smoke sauna offers the deep, soft heat that true sauna enthusiasts cherish. Complete with a traditional wood-burning stove and genuine birch whisks.",
    amenities: ["Smoke sauna", "Wood-burning stove", "Shower facilities", "Changing room", "Relaxation area", "Traditional whisks available"],
    availableTimeSlots: ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"],
  },
  {
    id: "2",
    title: "Modern Urban Sauna & Lounge",
    location: "Töölö, Helsinki",
    price: 75,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&auto=format&fit=crop&q=60",
    type: "Modern",
    description: "A contemporary take on the Finnish sauna experience, featuring state-of-the-art facilities in a stylish urban setting. Perfect for those who appreciate modern comfort while enjoying traditional wellness practices.",
    amenities: ["Electric sauna", "Modern lounge", "Premium shower products", "Towel service", "Refreshment bar"],
    availableTimeSlots: ["10:00", "12:00", "14:00", "16:00", "18:00"],
  },
  {
    id: "3",
    title: "Waterfront Wood-Burning Sauna",
    location: "Vuosaari, Helsinki",
    price: 95,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&auto=format&fit=crop&q=60",
    type: "Traditional",
    description: "Located by the sea, this traditional wood-burning sauna offers stunning views and the authentic Finnish sauna experience. Features include direct access to swimming in the sea and a spacious terrace for cooling down.",
    amenities: ["Wood-burning stove", "Sea access", "Terrace", "Changing facilities", "Firewood included"],
    availableTimeSlots: ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"],
  },
  {
    id: "4",
    title: "Luxury Wellness Sauna Suite",
    location: "Kamppi, Helsinki",
    price: 120,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&auto=format&fit=crop&q=60",
    type: "Modern",
    description: "A premium wellness experience combining traditional Finnish sauna with modern luxury. Features include both electric and infrared saunas, plus a private relaxation lounge.",
    amenities: ["Dual sauna types", "Private lounge", "Premium amenities", "Massage booking available", "Refreshments included"],
    availableTimeSlots: ["10:00", "12:00", "14:00", "16:00", "18:00"],
  }
];

const SaunaDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const sauna = saunas.find(s => s.id === id);
  
  if (!sauna) {
    return <div className="container mx-auto p-8">Sauna not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <img
                src={sauna.image}
                alt={sauna.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div>
              <h1 className="text-3xl font-bold mb-2">{sauna.title}</h1>
              <div className="flex items-center gap-4 text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{sauna.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>{sauna.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>2 hours</span>
                </div>
              </div>
              
              <p className="text-muted-foreground">{sauna.description}</p>
            </div>

            <Separator />
            
            <SaunaAmenities amenities={sauna.amenities} />
            
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SaunaBuddies />
              <SaunaChatroom />
            </div>

            <Separator />
            
            <SaunaReviews saunaId={sauna.id} />
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <div className="mb-4">
                <span className="text-2xl font-bold">{sauna.price}€</span>
                <span className="text-muted-foreground"> / hour</span>
              </div>
              
              <SaunaBookingForm
                sauna={sauna}
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaunaDetails;