import { calculateStandardDeviation } from '../../../src/utils/mathUtils.js';

describe('mathUtils', () => {
  describe('calculateStandardDeviation', () => {
    it('should correctly calculate standard deviation', () => {
      const values = [2, 4, 4, 4, 5, 5, 7, 9];
      const result = calculateStandardDeviation(values);
      expect(result).toBeCloseTo(2.0, 2);
    });

    it('should return 0 for an array with all same values', () => {
      const values = [1, 1, 1, 1, 1];
      const result = calculateStandardDeviation(values);
      expect(result).toBe(0);
    });
  });
});
