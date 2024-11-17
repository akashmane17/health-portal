export function requireUser(req, res, next) {
  if (!req.user) {
    return res.status(403).json({ login: false, message: "Invalid session" });
  }

  return next();
}
