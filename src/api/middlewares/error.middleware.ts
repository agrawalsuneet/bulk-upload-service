import { Request, Response, NextFunction } from 'express';
import { logger } from '../../utils/logger.js';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const error =
    err instanceof Error
      ? err
      : new Error('Unexpected error occurred');

  logger.error(error.message, { stack: error.stack });

  res.status(500).json({
    message: error.message,
  });
}
