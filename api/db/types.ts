import { Schema } from 'mongoose';
import type { ObjectId } from 'mongodb';

export interface IAppliance {
  name: string
}

export interface IUser {
  username: string;
  email: string;
  userGroups: ObjectId[] | []
}

export interface IGroup {
  name: string;
  users: [{ type: Schema.Types.ObjectId, ref: 'user' }];
}