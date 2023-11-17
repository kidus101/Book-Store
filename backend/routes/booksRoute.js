import express from "express";
import {BookModel} from "../model/BookModel";
const router = express.Router();

router.post("/", async (request, response) => {
  try {
    if (
      !request.body.author ||
      !request.body.title ||
      !request.body.publishedYear
    ) {
      response.status(400).send({ message: "Send all the required fields" });
    }

    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishedYear: request.body.publishedYear,
    };

    const book = await BookModel.create(newBook);
    response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.get("/", async (request, response) => {
  try {
    const books = await BookModel.find({});
    response.status(200).send({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log({ message: error.message });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const book = await BookModel.findById(id);

    response.status(200).send(book);
  } catch (error) {
    console.log({ message: error.message });
  }
});

router.put("/:id", async (request, response) => {
  try {
    // 1. Using the mongoose method calleed find by Id and updata
    if (
      !request.body.author ||
      !request.body.title ||
      !request.body.publishedYear
    ) {
      response.status(400).send({ message: "Send all the required fields" });
    }

    const { id } = request.params;

    const result = await BookModel.findByIdAndUpdate(id, request.body);

    if (!result) {
      response.status(400).send({ message: " No Books Found" });
    }

    response.status(200).send({ message: "Book Updated Successfully" });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (request, response) => {
  const { id } = request.params;

  const result = await BookModel.findByIdAndDelete(id);

  if (!result) {
    response.status(404).send({ message: "Book Not Found " });
  }

  response.status(200).send({ message: "Book Deleted Successfully" });
});


export default router;