import { useParams } from "react-router-dom";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MapPin, Clock, Star } from "lucide-react";
import { SaunaReviews } from "@/components/sauna/SaunaReviews";
import { SaunaBookingForm } from "@/components/sauna/SaunaBookingForm";
import { SaunaAmenities } from "@/components/sauna/SaunaAmenities";

// Mock data - in a real app, this would come from an API
const saunas = [
  {
    id: "1",
    title: "Traditional Wood-Burning Sauna",
    location: "Kallio, Helsinki",
    price: 65,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&auto=format&fit=crop&q=60",
    type: "Traditional",
    description: "Experience authentic Finnish sauna culture in this traditional wood-burning sauna. Perfect for those seeking the genuine sauna experience.",
    amenities: ["Wood-burning stove", "Shower facilities", "Changing room", "Towel service", "Relaxation area"],
    availableTimeSlots: ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"],
  },
  {
    id: "2",
    title: "Modern Infrared Wellness Suite",
    location: "Töölö, Helsinki",
    price: 85,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=60",
    type: "Infrared",
    description: "A sleek and modern infrared sauna designed for relaxation and wellness.",
    amenities: ["Infrared heaters", "Shower facilities", "Towel service"],
    availableTimeSlots: ["10:00", "12:00", "14:00", "16:00", "18:00"],
  },
  {
    id: "3",
    title: "Lakeside Smoke Sauna",
    location: "Vuosaari, Helsinki",
    price: 95,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1543489822-c49534f3271f?w=800&auto=format&fit=crop&q=60",
    type: "Smoke",
    description: "Enjoy a traditional smoke sauna experience by the lakeside.",
    amenities: ["Wood-burning stove", "Outdoor seating", "Shower facilities"],
    availableTimeSlots: ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"],
  },
  {
    id: "4",
    title: "Urban Rooftop Sauna Experience",
    location: "Kamppi, Helsinki",
    price: 75,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1515696955266-4f67e13219e8?w=800&auto=format&fit=crop&q=60",
    type: "Modern",
    description: "A unique rooftop sauna with a view, perfect for urban relaxation.",
    amenities: ["Rooftop access", "Shower facilities", "Changing room"],
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
