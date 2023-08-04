const sinon = require('sinon');
const chai = require('chai');
const app = require('../../src/app')
const model = require('../../src/models/user')
const chaiHttp = require('chai-http');
const { users, user, insertData } = require('./mocks/user')

chai.use(chaiHttp);

const { expect } = chai

describe('teste de integração da rota /user', () => {
  afterEach(sinon.restore)

  it('recuperando todos os users', async () => {
    sinon.stub(model, 'findAll').resolves(users)

    const chaiHttpResponse = await chai
    .request(app)
    .get('/user')

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(users);
  })

  it('recuperando user pelo id', async () => {
    sinon.stub(model, 'findById').resolves(user)

    const chaiHttpResponse = await chai
    .request(app)
    .get('/user/1')

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(user);
  })

  it('recuperando user pelo id inexistente', async () => {
    sinon.stub(model, 'findById').resolves()

    const chaiHttpResponse = await chai
    .request(app)
    .get('/user/1')

    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body).to.be.deep.equal({ msg: "User not found" });
  })

  it('criar user', async () => {
    sinon.stub(model, 'findByCpf').resolves()
    sinon.stub(model, 'findByEmail').resolves()
    sinon.stub(model, 'insert').resolves({ insertId: 1 })

    const chaiHttpResponse = await chai
    .request(app)
    .post('/user')
    .send(insertData)

    expect(chaiHttpResponse.status).to.be.equal(201);
    expect(chaiHttpResponse.body).to.be.deep.equal({ msg: "User create with successful" });
  })

  it('criar user com CPF já cadastrado', async () => {
    sinon.stub(model, 'findByCpf').resolves({})
    sinon.stub(model, 'findByEmail').resolves()
    sinon.stub(model, 'insert').resolves({ insertId: 1 })

    const chaiHttpResponse = await chai
    .request(app)
    .post('/user')
    .send(insertData)

    expect(chaiHttpResponse.status).to.be.equal(409);
    expect(chaiHttpResponse.body).to.be.deep.equal({ msg: "Cpf already exists" });
  })

  it('criar user com Email já cadastrado', async () => {
    sinon.stub(model, 'findByCpf').resolves({})
    sinon.stub(model, 'findByEmail').resolves()
    sinon.stub(model, 'insert').resolves({ insertId: 1 })

    const chaiHttpResponse = await chai
    .request(app)
    .post('/user')
    .send(insertData)

    expect(chaiHttpResponse.status).to.be.equal(409);
    expect(chaiHttpResponse.body).to.be.deep.equal({ msg: "Cpf already exists" });
  })

  it('removendo user', async () => {
    sinon.stub(model, 'remove').resolves(1)
    sinon.stub(model, 'findById').resolves({ id: 1 })

    const chaiHttpResponse = await chai
    .request(app)
    .delete('/user/1')
    .send(insertData)

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal({ msg: "User removed with successful" });
  })

  it('removendo user com id inexistente', async () => {
    sinon.stub(model, 'findById').resolves()
    sinon.stub(model, 'remove').resolves(1)

    const chaiHttpResponse = await chai
    .request(app)
    .delete('/user/1')
    .send(insertData)

    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body).to.be.deep.equal({ msg: "User not found" });
  })
})
