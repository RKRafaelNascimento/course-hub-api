import Joi from "joi";

const create = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  duration: Joi.number().integer().required(),
  instructorId: Joi.number().integer().required(),
});

const courseDelete = Joi.object({
  id: Joi.number().integer().required(),
});

export = { create, courseDelete };
