import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = (req, res, next) => {
  try {
    const token = req?.cookies?.jwt;

    if (!token) {
      return res.status(401).json({ error: "Not authorized" });
    }

    jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Not authorized" });
      }

      const user = await User.findById(decoded?.userId).select("-password");
      req.user = user;

      next();
    });
  } catch (error) {
    console.log("Error in protectRoute controller ", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
