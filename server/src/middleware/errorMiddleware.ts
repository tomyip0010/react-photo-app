import { NextFunction, Request, Response } from 'express';
import HttpException from '../helper/HttpException';
 
function errorMiddleware(
  err: HttpException, request: Request,response: Response, next: NextFunction,
) {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';
  const error = {
    status,
    message,
  }
  response
    // .status(status)
    .send({
      error,
    })
}
 
export default errorMiddleware;