import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState("1");

  return (
    <div className="w-full max-w-6xl mx-auto mb-8">
      <div className="bg-white rounded-full shadow-lg flex items-center p-2 gap-2">
        <div className="flex-1 flex items-center gap-2 pl-4">
          <Search className="w-5 h-5 text-gray-500" />
          <Input
            type="text"
            placeholder="Search destinations"
            className="border-0 focus-visible:ring-0 bg-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="h-8 w-[1px] bg-gray-200" />
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {checkIn ? format(checkIn, "MMM dd") : "Check in"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={checkIn}
              onSelect={setCheckIn}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        
        <div className="h-8 w-[1px] bg-gray-200" />
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {checkOut ? format(checkOut, "MMM dd") : "Check out"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={checkOut}
              onSelect={setCheckOut}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        
        <div className="h-8 w-[1px] bg-gray-200" />
        
        <Input
          type="number"
          placeholder="Guests"
          className="max-w-[100px] border-0 focus-visible:ring-0"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        />
        
        <Button size="icon" className="rounded-full">
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;