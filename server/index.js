import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import hotelRoute from "./routes/hotels.js";
import roomRoute from "./routes/rooms.js";
import userRoute from "./routes/users.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(express.json());
dotenv.config();  

app.listen(7777, () => {
  console.log("Server is running on port: 7777");

  mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(() => {
      console.log("Database connection is succesfull");
    })
    .catch((err) => {
      console.log("Can`t connect to DB");
    });
});

mongoose.connection.on("disconnected", () => {
  console.log("DB is disconnected ");
});

app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelRoute);
app.use("/api/rooms", roomRoute);
app.use("/api/users", userRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });

  return res.status(500).json();
});
