import Message from "../models/message.model.js";
import bcrypt from "bcryptjs";
import gennerateTokenAndSetCookie from "../utils/generateToken.js";

export const sendMessage = async (req, res) => {
  console.log("meesage recieved");
  res.send("message recieved");
  const { senderId, receiverId, message } = req.body;
  const { id } = req.params.id;
  const newMessage = new Message({
    senderId,
    receiverId,
    message,
  });

  try {
    const savedMessage = await newMessage.save();
    return res.status(200).json(savedMessage);
  } catch (error) {
    console.log("Error in sendMessage controller ", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
