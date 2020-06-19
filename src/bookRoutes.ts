import {Router} from "express";
import {validate} from "./validateBookMiddleware";
import {BookController} from "./bookController";
import {layoutDecorator} from "./layoutDecorator";
import {links} from "./links";

export const bookRoutesFactory = ({createOrUpdate, details, getList}: BookController) => {
    const router = Router();
    router.use(layoutDecorator);
    const {BOOK, BOOK_COLLECTION} = links.resources;
    router.post(BOOK_COLLECTION, validate,  createOrUpdate);
    router.get(BOOK, details);
    router.get(BOOK_COLLECTION, getList);
    return router;
};
