import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import memberRoutes from "./routes/memberRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Gym Management API Running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/attendance", attendanceRoutes);

export default app;