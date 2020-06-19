import {bookServiceFactory} from "../../src/bookService";
import {bookRepositoryFactory} from "../../src/inMemoryBookRepository";
import assert from "assert";

describe("Book service", function() {
    it("can create a book", async function() {
        // given
        const bookRepository = bookRepositoryFactory();
        const bookService = bookServiceFactory(bookRepository);
        const book = {title: "the title", authors: [], isbn: "ISBN", description: "desc"};

        // when
        await bookService.createOrUpdate(book);

        // then
        const bookFromDB = await bookRepository.findOne("ISBN");
        assert.deepStrictEqual(bookFromDB, {slug: "the-title", ...book});
    });

});