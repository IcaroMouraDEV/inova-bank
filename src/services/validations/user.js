const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().min(10).required(),
  email: Joi.string().email().required(),
  cpf: Joi.string().regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}/).required(),
  password: Joi.string().min(8).required(),
  age: Joi.number().min(16).required(),
})

const validation = (data) => {
  const { error: err } = schema.validate(data)

  if (err) return {
    err: true,
    code: 400,
    msg: err.message
  }

  return { err: false }
}

module.exports = {
  validation
}