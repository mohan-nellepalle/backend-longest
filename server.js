import express from "express";
import connectDB from "./config/db.js"; // Changed from { connectDB }
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./config/swagger.js";
// import { connectDB } from "./config/db.js";
// Import routes
import notificationRoutes from "./routes/notificationRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import workLogRoutes from "./routes/workLogRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
connectDB();

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/notifications", notificationRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/users", userRoutes);
app.use("/api/worklogs", workLogRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
