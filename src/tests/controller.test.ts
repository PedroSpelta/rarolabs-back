import { expect } from 'chai';
import { StatusCodes } from 'http-status-codes';
import Sinon from 'sinon';
import paginationControllers from '../controllers/paginationControllers';
import paginationErrors from '../errors/paginationErrors';

describe('Testing pagination controller', () => {
  let status: any;
  let json: any;
  let query: any;
  let req: any = { query };
  let res: any;
  let next: any;
  beforeEach(() => {
    next = Sinon.stub();
    json = Sinon.stub();
    status = Sinon.stub();
    res = { status, json };

    next.returns({});
    json.returns({})
    status.returns(res);
  });

  afterEach(() => {
    Sinon.restore();
  });
  describe('Testing incorrect input', async () => {
    before(() => {
      req.query = {
        paginaAtual: 'aaa',
        quantidadePaginas: 'abc',
      };
    });

    it('Should return a error', async () => {
      await paginationControllers.getPagination(req, res, next);
      expect(next.calledWith(paginationErrors.invalidQuery)).to.be.true;
    });
  });

  describe('Testing correct input', () => {
    before(() => {
      req.query = {
        paginaAtual: '1',
        quantidadePaginas: '4',
      };
    });

    it('Should response status 200 and the pagination', async () => {
      await paginationControllers.getPagination(req, res, next);
      expect(res.status.calledWith(StatusCodes.OK)).to.be.true;
      expect(res.json.calledWith(['**1**', '2', '3', '4'])).to.be.true;
    });
  });
});
