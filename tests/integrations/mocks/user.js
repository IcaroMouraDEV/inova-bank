const users = [
  {
    id: 1,
    name: 'teste da silva',
    email: 'teste@teste.com',
    cpf: '111.111.111-11',
    password: 'e1b7e7803215d5488588370572d13102',
    age: 22,
    active: 1
  },
  {
    id: 2,
    name: 'ciclano costa',
    email: 'teste2@teste.com',
    cpf: '222.222.222-22',
    password: 'ca358bb4586ec8b951c614037f28bc68',
    age: 16,
    active: 1
  },
]

const user = {
  id: 3,
  name: 'fulano silva e silva',
  email: 'teste3@teste.com',
  cpf: '333.333.333-33',
  password: '71a3a2b9b5a2b09dba533d73d1d11eb3',
  age: 40,
  active: 0
}

const insertData = {
  name: 'teste ciclano da silva',
  email: 'teste4@teste.com',
  cpf: '444.444.444-44',
  password: 'ciclano@123',
  age: 19,
}

module.exports = {
  users,
  user,
  insertData,
}
