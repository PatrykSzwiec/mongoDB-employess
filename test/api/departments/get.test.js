const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/departments', () => {

  it('/ should return all departments', () => {

  });

  it('/:id should return one department by :id ', () => {

  });

  it('/random should return one random department', () => {

  });

});