import { logger } from '../../utils/logger.js';
export function errorHandler(err, _req, res, _next) {
    const error = err instanceof Error
        ? err
        : new Error('Unexpected error occurred');
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({
        message: error.message,
    });
}
//# sourceMappingURL=error.middleware.js.map