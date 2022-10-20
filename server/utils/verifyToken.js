import jwt from "jsonwebtoken";
import createError from "http-errors";

const verifyToken = (req, res, next) => {
  const token = req.cookies["access-token"];

  if (!token) {
    return next(createError(401, "Bu işlem için erişim iznin yok."));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token doğrulanamadı."));
    req.user = user;
    next();
  });
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) next();
    else return next(createError(403, "Bunu yapma iznine sahip"));
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) next();
    else return next(createError(403, "Bunu yapma iznine sahip değilsin."));
  });
};

export { verifyToken, verifyUser, verifyAdmin };
