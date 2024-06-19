export interface Profile {
  fullname: string;
  email: string;
  phone: string;
}

export interface AuthEntity {
  jwt: string;
  profile: Profile;
}

export const getAuthData = (): Promise<AuthEntity> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        jwt: "asd",
        profile: {
          fullname: "Kacper Płusa",
          email: "kacprpl@gmail.com ",
          phone: "+48 473 384 123",
        },
      });
    }, 3000);
  });
};
