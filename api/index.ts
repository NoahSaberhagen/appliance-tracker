import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { Appliance, User, UserGroup } from './db/models';
import { IAppliance, IUser } from './db/types';
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

// Users
app.post('/users/create/:email/:username', async (req, res) => {
  const { email, username } = req.params;

  if (!email || !username) {
    console.error('missing properties for user')
  }

  const user = new User<IUser>({
    username,
    email,
    userGroups: []
  })

  try {
    await user.save()
    console.log('user created')
    res.sendStatus(200)
  } catch (e) {
    console.error(e)
    res.sendStatus(400)
  }
})

// Appliances
app.post('/appliances/create/:name', async (req, res) => {
  const { name } = req.params

  if (!name) {
    console.error('missing property for appliance')
    res.sendStatus(400)
  }

  const appliance = new Appliance<IAppliance>({
    name
  })

  try {
    await appliance.save()
    console.log('appliance created')
    res.sendStatus(200)
  } catch (e) {
    console.error(e)
    res.sendStatus(500)
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
