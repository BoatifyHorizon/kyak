export interface ProfileData {
  fullname: string;
  email: string;
  phone: string;
  currentBooking: number;
  allBookings: number;
}

export const getProfileData = (): Promise<ProfileData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        fullname: "Kacper Płusa",
        email: "kacprpl@gmail.com ",
        phone: "+48 473 384 123",
        currentBooking: 1,
        allBookings: 23,
      });
    }, 1000);
  });
};

export const changePassword = (_password: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(false);
    }, 1000);
  });
};
