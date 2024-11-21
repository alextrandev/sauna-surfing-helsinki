import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Redirect if user is already logged in
    if (user) {
      navigate(`/dashboard/${user.role}`);
    }

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          // Fetch the user's profile
          const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", session.user.id)
            .single();

          // Update local auth state
          useAuth.getState().setUser({
            id: session.user.id,
            email: session.user.email!,
            name: session.user.user_metadata.username || session.user.email!.split("@")[0],
            role: profile?.role || "user",
          });

          // Redirect to dashboard
          navigate(`/dashboard/${profile?.role || "user"}`);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, user]);

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
            redirectTo={`${window.location.origin}/login`}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;