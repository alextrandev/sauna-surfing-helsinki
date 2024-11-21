import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            {user.role === "renter" ? "Renter Dashboard" : "User Dashboard"}
          </h1>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Welcome, {user.name}!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {user.role === "renter"
                  ? "Manage your saunas and bookings here."
                  : "View your sauna bookings and favorites here."}
              </p>
            </CardContent>
          </Card>

          {user.role === "renter" ? (
            <Card>
              <CardHeader>
                <CardTitle>Your Listed Saunas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  You haven't listed any saunas yet.
                </p>
                <Button className="mt-4">Add New Sauna</Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Your Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  You don't have any active bookings.
                </p>
                <Button className="mt-4" onClick={() => navigate("/")}>
                  Browse Saunas
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;