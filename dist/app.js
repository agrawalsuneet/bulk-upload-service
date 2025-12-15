import express from 'express';
import { jobRoutes } from './api/routes/job.routes.js';
import { requestLogger } from './api/middlewares/request-logger.middleware.js';
import { errorHandler } from './api/middlewares/error.middleware.js';
export const app = express();
app.use(express.json());
app.use(requestLogger);
app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
});
app.use('/jobs', jobRoutes);
app.use(errorHandler);
//# sourceMappingURL=app.js.map