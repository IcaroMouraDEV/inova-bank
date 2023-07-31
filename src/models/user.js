const con = require('./connection')

const findAll = async () => {
  const [data] = await con.execute('SELECT * FROM user WHERE active=?', [1])

  return data
}

const findById = async (id) => {
  const [[data]] = await con.execute('SELECT * FROM user WHERE id=?', [id])

  return data
}

const findByCpf = async (cpf) => {
  const [[data]] = await con.execute('SELECT * FROM user WHERE cpf=?', [cpf])

  return data
}

const findByEmail = async (email) => {
  const [[data]] = await con.execute('SELECT * FROM user WHERE email=?', [email])

  return data
}

const insert = async (data) => {
  const [{ insertId }] = await con.execute(`
    INSERT INTO user (name, email, cpf, password, age, active)
    VALUE (?,?,?,?,?,?)
    `,
    [data.name, data.email, data.cpf, data.password, data.age, data.active],
  );

  return insertId;
}

const remove = async (id) => {
  const data = await con.execute('UPDATE user SET active=? WHERE id=?', [0, id])

  return data
}

module.exports = {
  findAll,
  findById,
  findByCpf,
  findByEmail,
  insert,
  remove
}