import { logger } from '../../utils/logger.js';
export function requestLogger(req, res, next) {
    const startTime = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - startTime;
        logger.info('Incoming request', {
            method: req.method,
            path: req.originalUrl,
            statusCode: res.statusCode,
            durationMs: duration,
        });
    });
    next();
}
//# sourceMappingURL=request-logger.middleware.js.map