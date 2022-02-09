import { NextFunction, Request, Response } from "express";

export interface IError {
  status: number;
  message: string;
}

export interface IErrorMiddleware {
  (err: IError, _req: Request, res: Response, _next: NextFunction): any;
}