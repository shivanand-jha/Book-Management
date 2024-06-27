import jwt from "jsonwebtoken";
import { CreateError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(CreateError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(CreateError(403, "Token is not valid!"));
    }
    req.user = user;
    next(); // Call next() inside jwt.verify callback
  });
};

export const verifyUser = async (req, res, next) => {
  try {
    await verifyToken(req, res, async () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        return next(CreateError(403, "You are not authorized!"));
      }
    });
  } catch (err) {
    next(err); // Forward any errors to the error handler
  }
};

export const verifyAdmin = async (req, res, next) => {
  try {
    await verifyToken(req, res, async () => {
      if (req.user.isAdmin) {
        next();
      } else {
        return next(CreateError(403, "You are not authorized!"));
      }
    });
  } catch (err) {
    next(err); // Forward any errors to the error handler
  }
};
