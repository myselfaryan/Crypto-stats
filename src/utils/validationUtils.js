import Joi from 'joi';

export const coinSchema = Joi.object({
  coin: Joi.string().valid('bitcoin', 'matic-network', 'ethereum').required(),
});
