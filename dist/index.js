import { createServer } from 'http';
import { app } from './app.js';
import { logger } from './utils/logger.js';
import { config } from './config/index.js';
async function startServer() {
    try {
        const server = createServer(app);
        server.listen(config.port, () => {
            logger.info(`Bulk Upload Service started on port ${config.port}`);
        });
        // Graceful shutdown handling
        process.on('SIGTERM', () => shutdown(server));
        process.on('SIGINT', () => shutdown(server));
    }
    catch (error) {
        logger.error('Failed to start server', error);
        process.exit(1);
    }
}
function shutdown(server) {
    logger.info('Shutting down server gracefully...');
    server.close(() => {
        logger.info('HTTP server closed');
        process.exit(0);
    });
}
startServer();
//# sourceMappingURL=index.js.map