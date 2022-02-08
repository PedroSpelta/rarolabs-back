import express from 'express';
import router from '../routes';

const app = express();
app.use(express.json());
app.get('/', (_req, res) => {
  res.send('Hello');
});
app.use(router);


export default app;
