import {Book} from "./book";
import {Collection} from "mongodb";
import {BookRepository} from "./bookRepository";

export type BookRepositoryFactory = (books: Collection<any>) => BookRepository;

export const bookRepositoryFactory: BookRepositoryFactory =  books => ({
    async findOne(isbn) {
        return books.findOne(
            {isbn},
            {projection: {_id: 0}}
        );
    },
    async createOrUpdate({title, authors, isbn, description, slug}: Book) {
        return books.updateOne(
            {isbn: isbn},
            {$set: {title, authors, isbn, description, slug}},
            {upsert: true}
        );
    },
    async findAll() {
        return books
            .find()
            .toArray();
    }
});