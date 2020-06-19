export const links = {
    resources: {
        BOOK: "/book/:isbn",
        BOOK_COLLECTION: "/book"
    }
};

export function bookLink(isbn: string) {
    return links.resources.BOOK.replace(":isbn", isbn);
}