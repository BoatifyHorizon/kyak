import axios, { AxiosResponse } from "axios";
import { BACKEND_ADDRESS, EQUIPMENT_CLOTHES, EQUIPMENT_LODKA, EQUIPMENT_OARS, USERS_JWT } from "./api-config";
import { ProfileData } from "./profile";

export interface StockItemEntity {
  id: number;
  name: string;
  description: string;
  img: string;
  imgAlt: string;
}

export interface LodkaItem extends StockItemEntity {
  capacity: number;
}

export const getLodkaItems = async (): Promise<LodkaItem[] | false> => {
  const jwt = localStorage.getItem("jwt");
  try {
    const profile: AxiosResponse<ProfileData> = await axios.post(BACKEND_ADDRESS + USERS_JWT, jwt);

    if (profile.status >= 400) {
      return false;
    }

    const lodki = await axios.get(BACKEND_ADDRESS + EQUIPMENT_LODKA);

    return lodki.data;
  } catch (error) {
    return false;
  }
};

export const getWioslaItems = async (): Promise<StockItemEntity[] | false> => {
  const jwt = localStorage.getItem("jwt");
  try {
    const profile: AxiosResponse<ProfileData> = await axios.post(BACKEND_ADDRESS + USERS_JWT, jwt);

    if (profile.status >= 400) {
      return false;
    }

    const lodki = await axios.get(BACKEND_ADDRESS + EQUIPMENT_OARS);

    return lodki.data;
  } catch (error) {
    return false;
  }
};

export const getOdziezItems = async (): Promise<StockItemEntity[] | false> => {
  const jwt = localStorage.getItem("jwt");
  try {
    const profile: AxiosResponse<ProfileData> = await axios.post(BACKEND_ADDRESS + USERS_JWT, jwt);

    if (profile.status >= 400) {
      return false;
    }

    const lodki = await axios.get(BACKEND_ADDRESS + EQUIPMENT_CLOTHES);

    return lodki.data;
  } catch (error) {
    return false;
  }
};
