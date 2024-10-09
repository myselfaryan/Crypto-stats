import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import { connectToDatabase } from './config/database.js';
import logger from './config/logger.js';
import apiRoutes from './routes/api.js';
import { startScheduler } from './services/schedulerService.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());

app.use('/api', apiRoutes);

app.use(errorHandler);
app.get('/', (req, res) => res.send('Webiste running succesfully'));
connectToDatabase();
startScheduler();

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

export default app;