import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/lib/auth";
import { Droplets, LogOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out successfully",
      description: "Come back soon!",
    });
    navigate("/");
  };

  return (
    <nav className="w-full border-b bg-white/80 backdrop-blur-sm relative z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <img src="/sauna-surf-logo.svg" alt="Sauna Surfing Logo" className="w-8 h-8" />
          <span className="text-sauna-ember">Sauna Surfing</span>
        </Link>

        <NavigationMenu className="relative z-50">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/find-buddy">
                <Button variant="ghost" className="gap-2">
                  <Droplets className="w-4 h-4" />
                  Find Sauna Buddy
                </Button>
              </Link>
            </NavigationMenuItem>

            {!user && (
              <>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Login</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="p-4 w-48 space-y-2">
                      <Link to="/login" className="block w-full">
                        <Button variant="outline" className="w-full justify-start">
                          Login as Surfer
                        </Button>
                      </Link>
                      <Link to="/login" className="block w-full">
                        <Button variant="outline" className="w-full justify-start">
                          Login as Host
                        </Button>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </>
            )}

            {user && (
              <>
                <NavigationMenuItem>
                  <Link to={`/dashboard/${user.role}`}>
                    <Button variant="ghost">Dashboard</Button>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Button
                    variant="ghost"
                    className="gap-2"
                    onClick={handleSignOut}
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Button>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};

export default Navbar;