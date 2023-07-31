const service = require('../services/user')

const findAll = async (req, res) => {
  if (req.query.cpf || req.query.email) {
    const { msg, code } = await service.findByQuery(req.query)

    return res.status(code).json({ msg })
  }

  const { msg, code } = await service.findAll()

  res.status(code).json(msg)
}

const findById = async (req, res) => {
  const { msg, code } = await service.findById(req.params.id)

  if (code === 200) return res.status(code).json(msg)

  res.status(code).json({ msg })
}

const insert = async (req, res) => {
  const { msg, code } = await service.insert(req.body)

  res.status(code).json({ msg })
}

const remove = async (req, res) => {
  const { id } = req.params;

  const { msg, code } = await service.remove(id)

  res.status(code).json({ msg })
}

module.exports = {
  findAll,
  findById,
  insert,
  remove
}
