import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SaunaBookingFormProps {
  sauna: {
    id: string;
    availableTimeSlots: string[];
  };
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
}

export const SaunaBookingForm = ({
  sauna,
  selectedDate,
  onDateSelect,
}: SaunaBookingFormProps) => {
  const [selectedTime, setSelectedTime] = useState<string>();
  const { toast } = useToast();

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Please select both date and time",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Booking successful!",
      description: `Your sauna is booked for ${selectedDate.toLocaleDateString()} at ${selectedTime}`,
    });
  };

  return (
    <div className="space-y-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={onDateSelect}
        className="rounded-md border"
        disabled={(date) => date < new Date()}
      />

      <Select onValueChange={setSelectedTime}>
        <SelectTrigger>
          <SelectValue placeholder="Select time" />
        </SelectTrigger>
        <SelectContent>
          {sauna.availableTimeSlots.map((time) => (
            <SelectItem key={time} value={time}>
              {time}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button className="w-full" onClick={handleBooking}>
        Book Now
      </Button>
    </div>
  );
};