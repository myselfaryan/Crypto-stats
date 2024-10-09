import { coinSchema } from '../utils/validationUtils.js';

export const validateCoinParam = (req, res, next) => {
  const { error } = coinSchema.validate(req.query);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
