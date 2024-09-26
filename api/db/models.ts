import { Schema, model } from 'mongoose';
import type { IAppliance, IUser, IGroup } from './types';

const applianceSchema = new Schema<IAppliance>({
  name: String
})

const userSchema = new Schema<IUser>({
  username: String,
  email: String,
  userGroups: []
})

const groupSchema = new Schema<IGroup>({
  name: String,
  users: [{ type: Schema.Types.ObjectId, ref: 'user' }]
})

export const User = model<IUser>('user', userSchema);
export const UserGroup = model<IGroup>('group', groupSchema)
export const Appliance = model<IAppliance>('appliance', applianceSchema)