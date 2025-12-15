import { Request, Response, NextFunction } from 'express';
import { logger } from '../../utils/logger.js';

export function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const startTime = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startTime;

    logger.info(
      'Incoming request',
      {
        method: req.method,
        path: req.originalUrl,
        statusCode: res.statusCode,
        durationMs: duration,
      }
    );
  });

  next();
}
