import jwt from "jsonwebtoken";

export const authAdmin = (req, res, next) => {
  try {
    const { atoken } = req.headers;

    if (!atoken) {
      return res
        .status(401)
        .json({ Success: false, Message: "Token Required" });
    }

    const decoded = jwt.verify(atoken, process.env.JWT_SECRET_KEY);

    if (decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      res.status(401).json({ message: "Not authorized, invalid token" });
    }
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res
      .status(401)
      .json({ message: "Not authorized, invalid token Found" });
  }
};
