import {Request, Response, NextFunction} from "express";

export const layoutDecorator =  function(req: Request, res: Response, next: NextFunction) {
    const nolayout = req.query.nolayout;
    const layout = nolayout == null ? "layout" : "";
    res.locals.layout = layout;
    next();
}