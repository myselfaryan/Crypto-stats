import { jest } from '@jest/globals';
import { getLatestStats, getStandardDeviation } from '../../../src/services/cryptoService.js';
import CryptoData from '../../../src/models/CryptoData.js';

jest.mock('../../../src/models/CryptoData.js');

describe('cryptoService', () => {
  describe('getLatestStats', () => {
    it('should return latest stats for a given coin', async () => {
      const mockData = {
        price: 50000,
        marketCap: 1000000000000,
        change24h: 2.5,
      };
      CryptoData.findOne.mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockData),
      });

      const result = await getLatestStats('bitcoin');
      expect(result).toEqual({
        price: 50000,
        marketCap: 1000000000000,
        '24hChange': 2.5,
      });
    });

    it('should throw an error if no data is found', async () => {
      CryptoData.findOne.mockReturnValue({
        sort: jest.fn().mockResolvedValue(null),
      });

      await expect(getLatestStats('bitcoin')).rejects.toThrow('No data found for the specified coin');
    });
  });
});