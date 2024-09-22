import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { Appliance, UserGroup } from './db/models';
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

app.get('/appliances/list', async (_req, res) => {
  try {
    const appliances = await Appliance.find()
    console.log(appliances);
    res.json(JSON.stringify(appliances))
  } catch (e) {
    console.error(e)
  }
})

app.post('/groups/create', async (req, res) => {
  const { name, userId } = req.body

  switch (true) {
    case !name:
      console.error('no name provided')
      break
    case !userId:
      console.error('no userId provided')
      break
    default:
      break
  }

  try {
    const group = new UserGroup({
      name,
      users: [userId]
    })

    await group.save()
    console.log(`created group called: ${name}`)
    res.sendStatus(200)
  } catch (e) {
    console.error(e)
  }
})

app.get('/groups/find/:userId', async (req, res) => {
  const { userId } = req.params

  if (!userId) {
    console.error('no userId provided')
  } else {
    try {
      const groups = await UserGroup.find({
        users: { $in: [userId] }
      })
      console.log(groups)
      res.json(groups)
    } catch (e) {
      console.error(e)
    }
  }
})
