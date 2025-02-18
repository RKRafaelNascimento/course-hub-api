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

const getById = Joi.object({
  id: Joi.number().integer().required(),
});

const update = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  duration: Joi.number().integer().positive().optional(),
  instructorId: Joi.number().integer().positive().optional(),
})
  .min(1)
  .messages({
    "object.min":
      "At least one property (title, description, duration, instructorId) must be provided for update.",
  });

export = { create, courseDelete, getById, update };
