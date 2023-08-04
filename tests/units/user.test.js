const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai')

const con = require('../../src/models/connection');
const model = require('../../src/models/user');
const service = require('../../src/services/user');
const controller = require('../../src/controllers/user');

const { users, user, insertData, usersService, userService } = require('./mocks/user')

const { expect } = chai

chai.use(sinonChai)

describe('teste unitario de user', () => {
  describe('testando a camada model', () => {
    afterEach(sinon.restore)
  
    it('recuperando todos os users', async () => {
      sinon.stub(con, 'execute').resolves([users]);
  
      const data = await model.findAll()
  
      expect(data).to.deep.equal(users)
    })
  
    it('recuperando o user com id 1', async () => {
      sinon.stub(con, 'execute').resolves([[user]]);
  
      const data = await model.findById(1)
  
      expect(data).to.deep.equal(user)
    })
    
    it('inserindo um usuário', async () => {
      sinon.stub(con, 'execute').resolves([{ insertId: 4 }]);
  
      const data = await model.insert({})
  
      expect(data).to.equal(4)
    })
  
    it('atualizando um usuário', async () => {
      sinon.stub(con, 'execute').resolves([{ affectedRows: 1 }]);
  
      const data = await model.remove({})
  
      expect(data[0].affectedRows > 0).to.equal(true)
    })
  })
  
  describe('testando a camada service', () => {
    afterEach(sinon.restore)
  
    it('recuperando todos os users', async () => {
      sinon.stub(model, 'findAll').resolves(users);
  
      const data = await service.findAll()
  
      expect(data).to.deep.equal({ code: 200, msg: users })
    })
  
    it('recuperando o user com id 1', async () => {
      sinon.stub(model, 'findById').resolves(user);
  
      const data = await service.findById(1)
  
      expect(data).to.deep.equal({ code: 200, msg: user })
    })
  
    it('recuperando o user com id inexistente', async () => {
      sinon.stub(model, 'findById').resolves();
  
      const data = await service.findById(1)
  
      expect(data).to.deep.equal({ code: 404, msg: 'User not found' })
    })
  
    it('inserindo um user', async () => {
      sinon.stub(model, 'insert').resolves({ insertId: 1 });
      sinon.stub(model, 'findByCpf').resolves();
      sinon.stub(model, 'findByEmail').resolves();
    
      const data = await service.insert(insertData)
    
      expect(data).to.deep.equal({ code: 201, msg: 'User create with successful' })
    })
  
    it('inserindo um user com cpf já cadastrado', async () => {
      sinon.stub(model, 'insert').resolves({ insertId: 1 });
      sinon.stub(model, 'findByCpf').resolves({ id: 10 });
      sinon.stub(model, 'findByEmail').resolves();
    
      const data = await service.insert(insertData)
    
      expect(data).to.deep.equal({ code: 409, msg: 'Cpf already exists' })
    })
  
    it('inserindo um user com email já cadastrado', async () => {
      sinon.stub(model, 'insert').resolves({ insertId: 1 });
      sinon.stub(model, 'findByCpf').resolves();
      sinon.stub(model, 'findByEmail').resolves({ id: 10 });
    
      const data = await service.insert(insertData)
    
      expect(data).to.deep.equal({ code: 409, msg: 'Email already exists' })
    })
  
    it('removendo o user com id 1', async () => {
      sinon.stub(model, 'findById').resolves(users[0]);
      sinon.stub(model, 'remove').resolves();
  
      const data = await service.remove(1)
  
      expect(data).to.deep.equal({ code: 200, msg: 'User removed with successful' })
    })
  
    it('removendo o user inexistente', async () => {
      sinon.stub(model, 'findById').resolves();
  
      const data = await service.remove(1)
  
      expect(data).to.deep.equal({ code: 404, msg: 'User not found' })
    })
  })
  
  describe('testando a camada controller', () => {
    afterEach(sinon.restore)
  
    it('buscando todos os users', async () => {
      const res = {};
      const req = { query: {} };
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(service, 'findAll')
        .resolves({ code: 200, msg: usersService });
  
      await controller.findAll(req, res);
  
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(usersService);
    });
  
    it('buscando user pelo id', async () => {
      const res = {};
      const req = { query: {}, params: { id: 1 } };
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(service, 'findById')
        .resolves({ code: 200, msg: userService });
  
      await controller.findById(req, res);
  
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(userService);
    });
  
    it('buscando user pelo id inexistente', async () => {
      const res = {};
      const req = { query: {}, params: { id: 1 } };
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(service, 'findById')
        .resolves({ code: 404, msg: 'User not found' });
  
      await controller.findById(req, res);
  
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ msg: 'User not found' });
    });
  
    it('inserindo user', async () => {
      const res = {};
      const req = { query: {} };
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(service, 'insert')
        .resolves({ code: 201, msg: 'User create with successful' });
  
      await controller.insert(req, res);
  
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({ msg: 'User create with successful' });
    });
  
    it('inserindo user com cpf já cadastrado', async () => {
      const res = {};
      const req = { query: {} };
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(service, 'insert')
        .resolves({ code: 409, msg: 'Cpf already exists' });
  
      await controller.insert(req, res);
  
      expect(res.status).to.have.been.calledWith(409);
      expect(res.json).to.have.been.calledWith({ msg: 'Cpf already exists' });
    });
  
    it('inserindo user com email já cadastrado', async () => {
      const res = {};
      const req = { query: {} };
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(service, 'insert')
        .resolves({ code: 409, msg: 'Email already exists' });
  
      await controller.insert(req, res);
  
      expect(res.status).to.have.been.calledWith(409);
      expect(res.json).to.have.been.calledWith({ msg: 'Email already exists' });
    });
  
    it('removendo user pelo id', async () => {
      const res = {};
      const req = { query: {}, params: { id: 1 } };
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(service, 'remove')
        .resolves({ code: 200, msg: 'User removed with successful' });
  
      await controller.remove(req, res);
  
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({ msg: 'User removed with successful' });
    });
  
    it('removendo user com id inexistente', async () => {
      const res = {};
      const req = { query: {}, params: { id: 1 } };
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(service, 'remove')
        .resolves({ code: 404, msg: 'User not found' });
  
      await controller.remove(req, res);
  
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ msg: 'User not found' });
    });
  })
})