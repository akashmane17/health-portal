import { verifyJWT } from "../utils/generateToken.js";

async function deserializeUser(req, res, next) {
  try {
    const { auth } = req.cookies;

    if (!auth) return next();

    const { payload, isExpired } = verifyJWT(auth);

    if (isExpired) {
      console.warn("JWT token is expired.");
      return next();
    }

    if (payload) {
      req.user = payload;
    }
  } catch (error) {
    console.error("Error during token deserialization:", error.message);
    res.clearCookie("auth");
  }

  return next();
}

export default deserializeUser;
