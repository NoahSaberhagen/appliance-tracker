import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRouter from './src/routes/user-router';
import 'dotenv/config';

const app = express();
const port = 5001;

app.use(bodyParser.json());
app.use('/user', userRouter);

app.listen(port, async () => {
  console.log(`listening on port ${port}`);

  const uri = process.env.MONGO_URI;

  try {
    if (!uri) {
      throw new Error('no mongo uri')
    } else {
      await mongoose.connect(uri)
      console.log('connected to mongodb')
    }
  } catch (e) {
    throw new Error(JSON.stringify(e))
  }
})
