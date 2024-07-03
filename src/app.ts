import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/database";
import config from "./config/env";



const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
