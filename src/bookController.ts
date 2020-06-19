import {BookService} from "./bookService";
import mapValues from "lodash.mapvalues";
import {responses} from "./responses";
import {Handler} from "./handler";
import {bookLink} from "./links";
import {BookRepository} from "./bookRepository";

function wrapWithTryCatch(fn: Handler) {
    const handler: Handler = (req, res, next) => {
        return fn(req, res, next).catch(next);
    }
    return handler;
}

function withErrorHandling<T>(api: { [k in keyof T]: Handler }) {
    return mapValues(api, wrapWithTryCatch);
}

export type BookController = {
  [k in 'createOrUpdate' | 'details' | 'getList']: Handler
}

export const bookControllerFactory = ({bookService, bookRepository}: { bookService: BookService, bookRepository: BookRepository }): BookController => {
    const createOrUpdate: Handler = async function (req, res, next) {
        const {title, authors, isbn, description} = req.body;
        await bookService.createOrUpdate({title, authors, isbn, description});
        res.redirect(bookLink(isbn));
    }

    const details: Handler = async function (req, res, next) {
        const isbn = req.params.isbn;
        const book = await bookRepository.findOne(isbn);

        responses.details(book, res, next);
    }

    const getList: Handler = async function(req, res) {
        const books = await bookRepository.findAll();

        responses.list(books, res);
    }

    return withErrorHandling<BookController>({createOrUpdate, details, getList});
};
