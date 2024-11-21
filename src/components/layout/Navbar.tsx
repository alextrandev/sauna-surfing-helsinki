import { Link } from "react-router-dom";
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

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="w-full border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl">
          Helsinki Saunas
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/find-buddy">
                <Button variant="ghost">Find Sauna Buddy</Button>
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
                          Login as User
                        </Button>
                      </Link>
                      <Link to="/login" className="block w-full">
                        <Button variant="outline" className="w-full justify-start">
                          Login as Renter
                        </Button>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </>
            )}

            {user && (
              <NavigationMenuItem>
                <Link to={`/dashboard/${user.role}`}>
                  <Button variant="ghost">Dashboard</Button>
                </Link>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};

export default Navbar;