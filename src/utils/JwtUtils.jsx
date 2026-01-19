export const decodeJwt = (token) => {
  if (!token || typeof token !== "string") return null;

  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
};
