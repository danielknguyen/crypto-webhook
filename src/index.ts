import "dotenv/config"; // shortcut that tells Node.js to load .env file before anything else runs
import express from "express";
import testRoute from "./routes/testRoute.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/", testRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
