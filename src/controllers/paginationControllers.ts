import { NextFunction, Request, Response } from 'express';
import paginationServices from '../services/paginationServices';

interface IController {
  (req: Request, res: Response, next: NextFunction): void;
}

export const getPagination: IController = async (req, res, next) => {
  try {
    // Get the query from api consumer
    const { paginaAtual, quantidadePaginas } = req.query;    

    // Validate query and return the pagination
    const pagination = await paginationServices.getPagination(
      paginaAtual,
      quantidadePaginas
    );
    
    // Response to user the pagination
    return res.status(200).json(pagination);
  } catch (err) {
    // Catch the error and pushes it to the error middleware
    next(err);
  }
};

export default {
  getPagination,
};
