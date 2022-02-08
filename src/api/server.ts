import app from './app';
require('dotenv').config();

const { PORT } = process.env;

app.listen(PORT || 3000, () => {
  console.log(`[express]: Running on ${PORT}`);
});
