import cron from 'node-cron';
import { fetchCryptoData } from './cryptoService.js';
import logger from '../config/logger.js';

export const startScheduler = () => {
  logger.info('Starting scheduler');

  // Run immediately when the server starts
  logger.info('Running initial data fetch');
  fetchCryptoData()
    .then(() => logger.info('Initial data fetch completed successfully'))
    .catch(error => logger.error('Initial data fetch failed:', error));

  // Run the job every 1 minute
  cron.schedule('0 */2 * * *', async () => {
    logger.info('Running scheduled job to fetch crypto data');
    try {
      await fetchCryptoData();
      logger.info('Scheduled job completed successfully');
    } catch (error) {
      logger.error('Error in scheduled job:', error);
    }
  });

  logger.info('Scheduler started. Job will run every 2 hours.');
};

  