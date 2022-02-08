import { Router } from "express";

const paginationRouter = Router();

paginationRouter.get('/', (req, res) => res.send('eae maria'));

export default paginationRouter;