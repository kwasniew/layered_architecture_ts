import {Book} from "./book";

export type BookRepository = {
    createOrUpdate(book: Book): Promise<any>,
    findOne(isbn: string): Promise<Book | null>,
    findAll(): Promise<Book[]>
};