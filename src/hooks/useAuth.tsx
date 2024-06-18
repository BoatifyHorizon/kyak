import { getCookie } from "@/lib/cookies-manager";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useAuth() {
  const [_authState, setAuthState] = useState({ isAuthenticated: false, loading: true });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const jwt = getCookie("jwtToken");
        const response = await axios.post("/api/check-auth", { jwt }); // Adjust the URL to your auth endpoint
        if (response.status === 200 && response.data.isAuthenticated) {
          setAuthState({ isAuthenticated: true, loading: false });
        } else {
          setAuthState({ isAuthenticated: false, loading: false });
        }
      } catch (error) {
        setAuthState({ isAuthenticated: false, loading: false });
      }
    };

    checkAuth();
  }, []);

  return { isAuthenticated: false, loading: true };
  // return authState;
}
