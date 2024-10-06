import jwt from "jsonwebtoken";

// Middleware for User authentication
export const authUser = (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res
        .status(401)
        .json({ Success: false, Message: "Token Required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.body.userId = decoded.userId;

    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res
      .status(401)
      .json({ message: "Not authorized, invalid token Found" });
  }
};
