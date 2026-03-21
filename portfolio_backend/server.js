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

app.use("/auth", require("./routes/authRoutes"));
app.use("/certifications", require("./routes/certificationRoutes"));
app.use("/contact", require("./routes/contactRoutes"));
app.use("/education", require("./routes/educationRoutes"));
app.use("/experience", require("./routes/experienceRoutes"));
app.use("/projects", require("./routes/projectRoutes"));
app.use("/services", require("./routes/serviceRoutes"));
app.use("/skills", require("./routes/skillRoutes"));
app.use("/upload", require("./routes/uploadRoutes"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
  console.log(`API docs available at: http://localhost:${PORT}/api-docs`);
});
