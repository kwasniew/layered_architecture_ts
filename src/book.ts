export type BookInput = {
    title: string,
    authors: string[],
    isbn: string,
    description: string
};

export type Book = BookInput & {slug: string};