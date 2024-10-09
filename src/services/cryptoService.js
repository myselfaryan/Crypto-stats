import axios from 'axios';
import CryptoData from '../models/CryptoData.js';
import { calculateStandardDeviation } from '../utils/mathUtils.js';
import logger from '../config/logger.js';

const COINGECKO_API_URL = process.env.COINGECKO_API_URL;
const COINS = ['bitcoin', 'matic-network', 'ethereum'];

export const fetchCryptoData = async () => {
  try {
    const response = await axios.get(`${COINGECKO_API_URL}/simple/price`, {
      params: {
        ids: COINS.join(','),
        vs_currencies: 'usd',
        include_market_cap: true,
        include_24hr_change: true,
      },
    });

    const data = response.data;
    for (const coin of COINS) {
      await CryptoData.create({
        coin,
        price: data[coin].usd,
        marketCap: data[coin].usd_market_cap,
        change24h: data[coin].usd_24h_change,
      });
    }

    logger.info('Crypto data fetched and stored successfully');
  } catch (error) {
    logger.error('Error fetching crypto data:', error);
  }
};

export const getLatestStats = async (coin) => {
  const latestData = await CryptoData.findOne({ coin }).sort({ timestamp: -1 });
  if (!latestData) {
    throw new Error('No data found for the specified coin');
  }
  return {
    price: latestData.price,
    marketCap: latestData.marketCap,
    '24hChange': latestData.change24h,
  };
};

export const getStandardDeviation = async (coin) => {
  const data = await CryptoData.find({ coin }).sort({ timestamp: -1 }).limit(100);
  if (data.length === 0) {
    throw new Error('No data found for the specified coin');
  }
  const prices = data.map((item) => item.price);
  return calculateStandardDeviation(prices);
};