import { BACKEND_ADDRESS, USERS_LOGIN, USERS_REGISTER } from "@/connection/api-config";
import { AuthEntity } from "@/connection/auth";
import axios, { AxiosResponse } from "axios";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const baseContext = {
  token: "",
  loginAction: (_data: Credentials) => {},
  logOut: () => {},
  register: (_data: RegisterBody) => {},
};

const AuthContext = createContext(baseContext);

interface Credentials {
  username: string;
  password: string;
}

interface RegisterBody {
  email: string;
  name: string;
  surname: string;
  phone: string;
  password: string;
}

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [token, setToken] = useState(localStorage.getItem("jwt") || "");
  const navigate = useNavigate();

  const loginAction = async (data: Credentials) => {
    try {
      const response: AxiosResponse<AuthEntity> = await axios.post(
        BACKEND_ADDRESS + USERS_LOGIN + "/" + data.username + "/" + data.password
      );

      if (response.data) {
        setToken(response.data.jwt);
        localStorage.setItem("jwt", response.data.jwt);
        navigate("/");
      } else throw new Error("Can't login");
    } catch (err) {
      console.error(err);
    }
  };

  const register = async (data: RegisterBody) => {
    try {
      const response: AxiosResponse<AuthEntity> = await axios.post(BACKEND_ADDRESS + USERS_REGISTER, data);

      if (response.data) {
        setToken(response.data.jwt);
        localStorage.setItem("jwt", response.data.jwt);
        navigate("/");
      } else throw new Error("Error while register");
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
  };

  return <AuthContext.Provider value={{ token, loginAction, logOut, register }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
