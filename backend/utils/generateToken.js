import jwt from "jsonwebtoken";

const gennerateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_KEY, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // for 15 days in ms
    httpOnly: true, // for security reason
    sameSite: "strict", // for csrf protection
    secure: process.env.NODE_ENV !== "development",
  });
};

export default gennerateTokenAndSetCookie;
