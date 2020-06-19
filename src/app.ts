import express from "express";
import {bookRoutesFactory} from "./bookRoutes";
import {clientError, serverError} from "./error";
import path from "path";
import {Db} from "mongodb";
import {bookControllerFactory} from "./bookController";
import {bookServiceFactory} from "./bookService";
import {bookRepositoryFactory} from "./mongoBookRepository";

export const appFactory = (db: Db) => {
    const app = express();
    const books = db.collection("books");
    const bookRepository = bookRepositoryFactory(books);
    const bookService = bookServiceFactory(bookRepository);
    const bookController = bookControllerFactory({bookService, bookRepository});
    const router = bookRoutesFactory(bookController);

    app.set("views", path.join(__dirname, "views"));
    app.set("view engine", "hbs");
    app.use(express.json());
    app.get("/", function (req, res) {
        res.send("Hello World!");
    });
    app.use("/", router);


    app.use(clientError);
    app.use(serverError);

    return app;
};