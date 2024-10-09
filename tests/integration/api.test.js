import request from 'supertest';
import { jest } from '@jest/globals';
import app from '../../src/app.js';
import CryptoData from '../../src/models/CryptoData.js';

jest.mock('../../src/models/CryptoData.js');

describe('API Integration Tests', () => {
  describe('GET /api/stats', () => {
    it('should return latest stats for a valid coin', async () => {
      const mockData = {
        price: 50000,
        marketCap: 1000000000000,
        change24h: 2.5,
      };
      CryptoData.findOne.mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockData),
      });

      const response = await request(app).get('/api/stats?coin=bitcoin');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        price: 50000,
        marketCap: 1000000000000,
        '24hChange': 2.5,
      });
    });

    it('should return 400 for an invalid coin', async () => {
      const response = await request(app).get('/api/stats?coin=invalid');
      expect(response.status).toBe(400);
    });
  });
});