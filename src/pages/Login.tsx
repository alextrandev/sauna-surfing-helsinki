import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import type { UserRole } from "@/types/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const isValidRole = (role: string): role is UserRole => {
    return role === "user" || role === "renter";
  };

  useEffect(() => {
    if (user) {
      navigate(`/dashboard/${user.role}`);
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          try {
            const { data: profile, error } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', session.user.id)
              .single();

            if (error) throw error;

            const role = profile?.role && isValidRole(profile.role) ? profile.role : "user";

            useAuth.getState().setUser({
              id: session.user.id,
              email: session.user.email!,
              name: session.user.user_metadata.username || session.user.email!.split("@")[0],
              role,
            });

            toast({
              title: "Welcome back!",
              description: "You have successfully signed in.",
            });

            navigate(`/dashboard/${role}`);
          } catch (error) {
            console.error('Error fetching user profile:', error);
            toast({
              title: "Error",
              description: "There was a problem signing you in. Please try again.",
              variant: "destructive",
            });
          }
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, user, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to Sauna Surfing</CardTitle>
          <CardDescription>
            Sign in to your account or create a new one
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#ef4444',
                    brandAccent: '#dc2626',
                  },
                },
              },
            }}
            providers={["google", "github"]}
            redirectTo={`${window.location.origin}/auth/callback`}
            onlyThirdPartyProviders={false}
            view="sign_in"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;