import chai, { expect } from 'chai';
import { StatusCodes } from 'http-status-codes';
import Sinon from 'sinon';
import paginationControllers from '../controllers/paginationControllers';
import paginationErrors from '../errors/paginationErrors';
import paginationServices from '../services/paginationServices';
import { addContinuity, getPages, makeArray } from '../utils/pagination';
import validatePagination from '../validate/pagination';

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
    json.returns({});
    status.returns(res);
  });

  afterEach(() => {
    Sinon.restore();
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

  describe('Testing incorrect input', () => {
    before(() => {
      Sinon.stub(paginationServices, 'getPagination').throws(
        paginationErrors.invalidQuery
      );
      req.query = {
        paginaAtual: 'aaaa',
        quantidadePaginas: 'teste',
      };
    });

    it('Should response status 400 and the pagination', async () => {
      await paginationControllers.getPagination(req, res, next);
      expect(next.calledWith(paginationErrors.invalidQuery)).to.be.true;
    });
  });
});

describe('Testing pagination services', () => {
  describe('Testing correct input', () => {
    it('Should return a pagination', async () => {
      const pagination = await paginationServices.getPagination(1, 2);
      expect(pagination).to.be.deep.equal(['**1**', '2']);
    });
  });

  describe('Testing incorrect input', () => {
    it('Should throw a error', async () => {
      try {
        const error = await paginationServices.getPagination('aaa', 'bbb');
        expect(() => error).to.throw();
      } catch (err) {
        expect(err).to.be.equal(paginationErrors.invalidQuery);
      }
    });
  });
});

describe('Testing util functions', () => {
  describe('Testing make array', () => {
    it('Should return a array from a number to another with a highlighted on start', () => {
      const array = makeArray(1, 5, 1);
      expect(array).to.deep.equal(['**1**', '2', '3', '4', '5']);
    });
    it('Should return a array from a number to another with a highlighted on middle', () => {
      const array = makeArray(1, 5, 3);
      expect(array).to.deep.equal(['1', '2', '**3**', '4', '5']);
    });
    it('Should return a array from a number to another with a highlighted on end', () => {
      const array = makeArray(1, 5, 5);
      expect(array).to.deep.equal(['1', '2', '3', '4', '**5**']);
    });
  });

  describe('Testing get pages function', () => {
    describe('Testing total pages smaller than 5', () => {
      it('Should return a pagination smaller than 5', () => {
        const array = getPages(1, 3);
        expect(array).to.be.deep.equal(['**1**', '2', '3']);
      });
    });

    describe('Testing total pages bigger than 5', () => {
      it('Should return a pagination of 5 pages with highlighted on start', () => {
        const array = getPages(1, 10);
        expect(array).to.be.deep.equal(['**1**', '2', '3', '4', '5']);
      });
      it('Should return a pagination of 5 pages with highlighted on center', () => {
        const array = getPages(5, 10);
        expect(array).to.be.deep.equal(['3', '4', '**5**', '6', '7']);
      });
      it('Should return a pagination of 5 pages with highlighted on end', () => {
        const array = getPages(9, 10);
        expect(array).to.be.deep.equal(['6', '7', '8', '**9**', '10']);
      });
    });
  });

  describe('Testing add continuity to pagination', () => {
    describe('Testing if total is bigger than 5 and', () => {
      it('Returns a "..." on start when first is bigger than 1', () => {
        const pagination = addContinuity(['2', '3', '**4**', '5', '6'], 6);
        expect(pagination).to.be.deep.equal([
          '...',
          '2',
          '3',
          '**4**',
          '5',
          '6',
        ]);
      });
      it('Returns a "..." on end when last smaller than total', () => {
        const pagination = addContinuity(['**1**', '2', '3', '4', '5'], 10);
        expect(pagination).to.be.deep.equal([
          '**1**',
          '2',
          '3',
          '4',
          '5',
          '...',
        ]);
      });
      it('Returns a "..." on both when first is bigger than 1 and last smaller than total', () => {
        const pagination = addContinuity(['4', '5', '**6**', '7', '8'], 10);
        expect(pagination).to.be.deep.equal([
          '...',
          '4',
          '5',
          '**6**',
          '7',
          '8',
          '...',
        ]);
      });
      it('Returns a pagination without "..." if total is smaller than 5', () => {
        const pagination = addContinuity(['**1**', '2', '3', '4'], 4);
        expect(pagination).to.be.deep.equal(['**1**', '2', '3', '4']);
      });
    });
  });
});
