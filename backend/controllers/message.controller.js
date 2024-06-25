import Message from "../models/message.model.js";
import bcrypt from "bcryptjs";
import gennerateTokenAndSetCookie from "../utils/generateToken.js";
import Conversation from "../models/conversation.model.js";

export const getMessages = async (req, res) => {
  try {
    const senderId = req.user?._id;
    const { id: receiverId } = req.params;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    const messages = await Message.find({
      _id: { $in: conversation?.messages || [] },
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller ", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user?._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages
        ? conversation.messages.push(newMessage._id)
        : (conversation.messages = [newMessage._id]);
    }

    await conversation.save();
    await newMessage.save();

    res.status(200).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller ", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
