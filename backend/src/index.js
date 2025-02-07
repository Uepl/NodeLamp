const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { readdirSync } = require("fs");
const { swaggerUi, swaggerSpec } = require("../config/swagger.js");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

readdirSync("./src/routes").map((c) => app.use("/api", require("./routes/" + c)));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Default route for root URL
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// Handle 404 errors for undefined routes
app.use((req, res, next) => {
  res.status(404).send("Route not found");
});

app.listen(PORT, () => {
  console.log(`Server has been running on PORT ${PORT}`);
});
