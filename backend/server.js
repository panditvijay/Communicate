import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import connectToMongoDb from "./db/connectToMongoDb.js";
import cors from "cors";
const app = express();
dotenv.config();

const PORT = process?.env?.PORT || 5001;

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connectToMongoDb();
  console.log(`running at port ${PORT}`);
});
