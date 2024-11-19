import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  MONGO_URI: Joi.string().uri().required(), // Confirma que é uma URI válida
  JWT_SECRET: Joi.string().required(),
  PORT: Joi.number().default(3000),
});
