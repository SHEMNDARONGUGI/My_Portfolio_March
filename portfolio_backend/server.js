require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(cors());

app.use(express.json());

const swaggerDocument = YAML.load("./swagger.yaml");

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/certifications", require("./routes/certificationRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/education", require("./routes/educationRoutes"));
app.use("/api/experience", require("./routes/experienceRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/skills", require("./routes/skillRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
  console.log(`API docs available at: http://localhost:${PORT}/api-docs`);
});
