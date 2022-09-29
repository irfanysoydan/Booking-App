import jwt from "jsonwebtoken";
import createError from "http-errors";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(createError(401, "Bu işlem için erişim iznin yok."));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token doğrulanamadı."));
    req.user = user;
  });
};
