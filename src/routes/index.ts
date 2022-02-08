import { Router } from 'express';
import paginationRouter from './pagination';

const router = Router();

router.use('/pagination', paginationRouter);

export default router;