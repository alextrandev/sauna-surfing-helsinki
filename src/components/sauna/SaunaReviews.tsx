import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock reviews data - in a real app, this would come from an API
const reviews = [
  {
    id: 1,
    user: {
      name: "Anna K.",
      avatar: "https://i.pravatar.cc/150?u=1",
    },
    rating: 5,
    date: "2024-02-15",
    comment: "Amazing traditional sauna experience! The wood-burning stove created the perfect atmosphere.",
  },
  {
    id: 2,
    user: {
      name: "Mikko P.",
      avatar: "https://i.pravatar.cc/150?u=2",
    },
    rating: 4,
    date: "2024-02-10",
    comment: "Great location and facilities. Would definitely come back!",
  },
];

interface SaunaReviewsProps {
  saunaId: string;
}

export const SaunaReviews = ({ saunaId }: SaunaReviewsProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={review.user.avatar} />
                  <AvatarFallback>{review.user.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">{review.user.name}</h3>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};