import Joi from "joi";

const authenticate = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export = { authenticate };
