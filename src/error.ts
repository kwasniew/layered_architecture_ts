import {NextFunction, Request, Response} from "express";

export class StatusError extends Error {
    constructor(readonly error: string | object, readonly status: number) {
        super();
        this.error = error;
    }
}

export function clientError(req: Request, res: Response, next: NextFunction) {
    const err = new StatusError("Not Found", 404);
    next(err);
}

function isProduction() {
    return process.env.NODE_ENV === 'production';
}

export function serverError(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err.stack);
    res.status(err.status || 500);
    if (err instanceof StatusError) {
        res.json({message: err.error, error: isProduction() ? {} : err.stack});
    } else {
        res.json({message: err.message, error: isProduction() ? {} : err.stack});
    }
}
