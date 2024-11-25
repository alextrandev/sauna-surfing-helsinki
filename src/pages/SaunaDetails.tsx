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
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const SaunaDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const { data: sauna, isLoading, error } = useQuery({
    queryKey: ['sauna', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('saunas')
        .select(`
          *,
          owner:profiles(username)
        `)
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return <div className="container mx-auto p-8">Loading...</div>;
  }

  if (error || !sauna) {
    return (
      <div className="container mx-auto p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Sauna Not Found</h2>
          <p className="text-muted-foreground">
            The sauna you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  // Mock data for available time slots - in a real app, this would come from the backend
  const availableTimeSlots = ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];

  // Mock amenities - in a real app, this would be part of the sauna data
  const amenities = [
    "Wood-burning stove",
    "Shower facilities",
    "Changing room",
    "Relaxation area",
    "Traditional whisks available"
  ];

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
            
            <SaunaAmenities amenities={amenities} />
            
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
                sauna={{
                  id: sauna.id,
                  availableTimeSlots
                }}
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