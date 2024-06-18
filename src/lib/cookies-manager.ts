export const getCookie = (name: string): string => {
  const cookies = document.cookie.split(";");

  cookies.forEach((cookie) => {
    if (cookie.startsWith(name)) {
      return cookie.split("=")[1];
    }
  });

  return "";
};

export const saveCookie = (name: string, param: string): void => {
  document.cookie = document.cookie + `;${name}=${param}`;
};
