import { Schema } from 'mongoose';

export interface IAppliance {
  name: string
}

export interface IUser {
  username: string;
  userGroups: []
}

export interface IUserGroup {
  name: string;
  users: [{ type: Schema.Types.ObjectId, ref: 'user' }];
}