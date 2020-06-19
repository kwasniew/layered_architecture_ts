import {makeSlug} from "./makeSlug";
import {BookInput} from "./book";
import {BookRepository} from "./bookRepository";

export type BookService = {
    createOrUpdate(book: BookInput): any
};

export type BookServiceFactory = (bookRepository: BookRepository) => BookService

export const bookServiceFactory: BookServiceFactory = (bookRepository) => ({
    createOrUpdate({title, authors, isbn, description}) {
        const slug = makeSlug(title);
        return bookRepository.createOrUpdate({title, slug, authors, isbn, description});
    }
});