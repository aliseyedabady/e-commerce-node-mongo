import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/database";
import config from "./config/env";
import api from "./routes";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

app.use(api);

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
