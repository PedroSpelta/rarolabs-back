import { Router } from "express";
import paginationControllers from "../controllers/paginationControllers";

const paginationRouter = Router();

paginationRouter.get('/',  paginationControllers.getPagination);

export default paginationRouter;