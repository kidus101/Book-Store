import express, { request, response } from "express";
import { PORT, MONGO_URI } from "./config.js";
import mongoose from "mongoose";
import {BookModel} from "./model/BookModel.js";
import booksRoute from "./routes/booksRoute.js"

const app = express();

// Middleware to parse JSON data
app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  response.status(200).send("Set re quest");
});

app.use("/books" , booksRoute )


mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Connected on Port ${PORT}`);
    });
    console.log("Connected to Mongo DB");
  })
  .catch((error) => {
    console.log(error);
  });
