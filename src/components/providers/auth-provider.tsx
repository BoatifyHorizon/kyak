import { AuthEntity, Profile } from "@/connection/auth";
import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const baseUser = {
  fullname: "",
  email: "",
  phone: "",
};

const baseContext = {
  token: "",
  user: baseUser,
  loginAction: (_data: Credentials) => {},
  logOut: () => {},
};

const AuthContext = createContext(baseContext);

interface Credentials {
  username: string;
  password: string;
}

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<Profile>(baseUser);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();

  const loginAction = async (data: Credentials) => {
    try {
      const response = await fetch("your-api-endpoint/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await response.json();
      const resData: AuthEntity = res.data;

      if (resData) {
        setUser(resData.profile);
        setToken(resData.jwt);
        localStorage.setItem("site", res.token);
        navigate("/");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(baseUser);
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
  };

  return <AuthContext.Provider value={{ token, user, loginAction, logOut }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
