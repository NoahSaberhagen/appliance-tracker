import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { Appliance } from './db/models';
import { IAppliance } from './db/types';
import 'dotenv/config';

const app = express();
const port = 5001

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
    console.error(e)
  }
})

app.use(bodyParser.json())

app.post('/appliances/create', async (req, res) => {
  const { name } = req.body

  if (!name) {
    throw new Error('invalid request')
  }

  const appliance = new Appliance<IAppliance>({
    name
  })

  try {
    await appliance.save()
    console.log('appliance created succesfully')
    res.send(200)
  } catch (e) {
    console.error(e)
  }
})
