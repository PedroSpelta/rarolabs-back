import { StatusCodes } from 'http-status-codes';
import { IErrorMiddleware } from '../types/interfaces';

const errorMiddleware: IErrorMiddleware = (err, _req, res, _next) => {
  const { status, message } = err;
  if (status) {
    return res.status(status).json({ message });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err });
};

export default errorMiddleware;
