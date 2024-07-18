const express = require("express");
const connectToMongo = require("./config/db");
const app = express();
const cors = require("cors");
const router = require("./routes/blog");
app.use(cors());
app.use(express.json());
app.use(express.static("public/upload"))
const PORT = 9000;
// API Routes

app.use("/api/v1", router);
connectToMongo();
app.listen(PORT, () => {
  console.log(`API is listening on port : ${PORT}`);
});
