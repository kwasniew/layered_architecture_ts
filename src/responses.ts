import {NextFunction, Response} from "express";
import {Book} from "./book";
import {bookLink} from "./links";

export const responses = {
    details(book: Book | null, res: Response, next: NextFunction) {
        if (book) {
            res.format({
                "text/html"() {
                    res.render("book", {book, layout: res.locals.layout});
                },
                "application/json"() {
                    res.json(book);
                },
                "default"() {
                    res.json(book);
                }
            });
        } else {
            next();
        }
    },
    list(books: Book[], res: Response) {
        res.format({
            "text/html"() {
                res.render("books", {books: books.map(book => ({...book, link: bookLink(book.isbn)})), layout: res.locals.layout});
            },
            "application/json"() {
                res.json(books);
            },
            "default"() {
                res.json(books);
            }
        });
    }
};