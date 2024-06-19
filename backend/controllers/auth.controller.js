import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import gennerateTokenAndSetCookie from "../utils/generateToken.js";
export const login = (_req, res) => {
  res.send("login");
};

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, username, password, confirmPassword, gender } =
      req?.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password does not match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      username,
      firstName,
      lastName,
      password: hashPassword,
      gender,
      profilePic: gender == "male" ? boyProfilePic : girlProfilePic,
    });
    gennerateTokenAndSetCookie(newUser?._id, res);
    await newUser
      .save()
      .then(() => {})
      .catch((error) => {
        console.log("new ", error);
      });

    res.status(201).json({
      _id: newUser?._id,
      username: newUser?.username,
      firstName: newUser?.firstName,
      lastName: newUser.lastName,
      profilePic: newUser?.profilePic,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (_req, res) => {
  res.send("login");
};
