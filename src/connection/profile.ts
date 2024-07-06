import axios, { AxiosResponse } from "axios";
import { BACKEND_ADDRESS, USERS_JWT, USERS_PASSWORD } from "./api-config";

export interface ProfileData {
  fullname: string;
  email: string;
  phone: string;
  currentBooking: number;
  allBookings: number;
}

export const getProfileData = async (): Promise<ProfileData | false> => {
  const jwt = localStorage.getItem("jwt");
  try {
    const profile: AxiosResponse<ProfileData> = await axios.post(BACKEND_ADDRESS + USERS_JWT, jwt);

    return profile.data;
  } catch (error) {
    return false;
  }
};

export const changePassword = async (password: string): Promise<boolean> => {
  const jwt = localStorage.getItem("jwt");
  try {
    const profile: AxiosResponse<ProfileData> = await axios.post(BACKEND_ADDRESS + USERS_JWT, jwt);

    const changed: AxiosResponse<string> = await axios.put(
      BACKEND_ADDRESS + USERS_PASSWORD + "/" + profile.data.email + "/" + password
    );

    if (changed.data === "Password Changed successfully") return true;

    return false;
  } catch (error) {
    return false;
  }
};
