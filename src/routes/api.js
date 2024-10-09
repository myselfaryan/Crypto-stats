import express from 'express';
import { getLatestStats, getStandardDeviation } from '../services/cryptoService.js';
import { validateCoinParam } from '../middleware/validateRequest.js';
import rateLimiter from '../middleware/rateLimiter.js';
import CryptoData from '../models/CryptoData.js';
import logger from '../config/logger.js';

const router = express.Router();

router.get('/stats', rateLimiter, validateCoinParam, async (req, res, next) => {
  try {
    const { coin } = req.query;
    const stats = await getLatestStats(coin);
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

router.get('/deviation', rateLimiter, validateCoinParam, async (req, res, next) => {
  try {
    const { coin } = req.query;
    const deviation = await getStandardDeviation(coin);
    res.json({ deviation });
  } catch (error) {
    next(error);
  }
});

// New route to check saved data
router.get('/check-data', async (req, res, next) => {
  try {
    const data = await CryptoData.find().sort({ timestamp: -1 }).limit(10);
    logger.info(`Retrieved ${data.length} entries from database`);
    res.json(data);
  } catch (error) {
    logger.error('Error retrieving data:', error);
    next(error);
  }
});

export default router;