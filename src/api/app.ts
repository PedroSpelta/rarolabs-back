import express from 'express';
import errorMiddleware from '../middlewares/errorMiddleware';
import router from '../routes';

const app = express();
app.use(express.json());
app.get('/', (_req, res) => {
  res.send('Server is running');
});
app.use(router);
app.use(errorMiddleware);


export default app;
