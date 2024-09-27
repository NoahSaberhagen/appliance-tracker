import express from 'express';
import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import { validateData } from '../middleware/validate-req';
import { userModel, zUser } from '../schema';
import { StatusCodes } from 'http-status-codes';

const userRouter = express.Router()

const createUser = async (req: Request, res: Response) => {
  const { username, email } = req.body;

  const user = new userModel({
    username,
    email,
  });

  try {
    await user.save()
    res
      .status(StatusCodes.OK)
      .json({
        message: 'user created successfully',
        data: req.body
      })
  } catch (e) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(e)
  }
}

userRouter.post('/create', validateData(zUser), createUser)

export default userRouter;

