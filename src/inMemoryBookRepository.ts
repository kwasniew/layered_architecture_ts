import {BookRepository} from "./bookRepository";
import {Book} from "./book";

export const bookRepositoryFactory = function() {
    const books: {[key: string]: Book} = {};

    const repository: BookRepository = {
        async createOrUpdate({title, slug, authors, isbn, description}) {
            books[isbn] = {title, slug, authors, isbn, description};
        },
        async findOne(isbn) {
            return books[isbn];
        },
        async findAll() {
            return Object.values(books);
        }
    };

    return repository;
}