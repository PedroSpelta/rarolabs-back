import { Router } from 'express';
import paginationRouter from './pagination';

const router = Router();

router.use('/paginacao', paginationRouter);

export default router;