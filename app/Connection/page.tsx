/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Toggle from "../components/Toggle";
import { FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";

const AuthPage = () => {
    const [loading, setLoading] = useState(false);
    const [session, setSession] = useState<any>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter();
  
    useEffect(() => {
      const fetchSession = async () => {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setSession(session);
  
        if (session) {
          router.push("/cv");
        } else {
          const url = new URL(window.location.href);
          if (url.hash.includes("access_token")) {
            window.history.replaceState({}, document.title, "/");
          }
        }
      };
  
      fetchSession();
  
      const { data: authListener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          setSession(session);
  
          if (session && event === "SIGNED_IN") {
            router.push("/cv");
          }
        }
      );
  
      return () => {
        authListener?.subscription.unsubscribe();
      };
    }, [router]);
  
    const handleSignIn = async (provider: "google") => {
      setLoading(true);
      setErrorMessage(null);
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/cv`,
        },
      });
  
      if (error) {
        console.error("Authentication error:", error.message);
        setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
      }
      setLoading(false);
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center poppins-regular">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          className="w-96 max-w-md p-8 space-y-4 shadow-lg rounded shadow-primary"
        >
          <h1 className="text-4xl font-bold text-center">Log in</h1>
          <Toggle />
          <div className="space-y-4">
            <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              <button
                onClick={() => handleSignIn("google")}
                className="btn w-full btn-outline btn-primary"
                disabled={loading}
                aria-busy={loading}
                aria-label="Connexion avec Google"
              >
                <FaGoogle />
                {loading ? (
                  <div className="spinner">
                    <span className="loading loading-ring loading-xs"></span>
                  </div>
                ) : (
                  "Sign in with Google"
                )}
              </button>
              {isHovered && (
                <motion.div
                  className="flex justify-center mt-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.span
                    className="text-4xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    😊
                  </motion.span>
                  <motion.span
                    className="text-4xl ml-2"
                    animate={{
                      scale: [1, 1.2, 1],
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    😄
                  </motion.span>
                </motion.div>
              )}
            </div>
            {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
          </div>
        </motion.div>
      </div>
    );
  };
  
  export default AuthPage;
