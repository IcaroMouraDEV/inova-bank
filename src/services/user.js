const model = require('../models/user');
const validate = require('./validations/user');
const md5 = require('md5')

const findAll = async () => {
  const data = await model.findAll()

  data.forEach((item) => {
    delete item.password
  });

  return { code: 200, msg: data }
}

const findById = async (id) => {
  const data = await model.findById(id)
 
  if (!data) return { code: 404, msg: 'User not found' }

  delete data.password

  return { code: 200, msg: data }
}

const findByQuery = async (query) => {
  let data;

  if (query.cpf) {
    data = await model.findByCpf(query.cpf)
  } else {
    data = await model.findByCpf(query.email)
  }
 
  if (!data) return { code: 404, msg: 'User not found' }

  delete data.password

  return { code: 200, msg: data }
}

const insert = async (data) => {
  const { err } = validate.validation(data)

  if (err) return {
    code: validate.code,
    msg: validate.msg
  }

  const cpfExist = await model.findByCpf(data.cpf)
  const emailExist = await model.findByEmail(data.email)

  if (cpfExist || emailExist) return {
    code: 409,
    msg: `${cpfExist ? 'Cpf' : 'Email'} already exists`
  }

  await model.insert({
    ...data,
    password: md5(data.password),
    active: 1,
  })

  return { code: 201, msg: 'User create with successful' }
}

const remove = async (id) => {
  const data = await model.findById(id)
 
  if (!data) return { code: 404, msg: 'User not found' }

  await model.remove(id)

  return { code: 200, msg: 'User removed with successful' }
}

module.exports = {
  findAll,
  findByQuery,
  findById,
  insert,
  remove
}
