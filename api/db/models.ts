import { Schema, model } from 'mongoose';
import type { IAppliance, IUser, IUserGroup } from './types';

const applianceSchema = new Schema<IAppliance>({
  name: String
})

const userSchema = new Schema<IUser>({
  username: String,
  userGroups: []
})

const userGroupSchema = new Schema<IUserGroup>({
  name: String,
  users: [{ type: Schema.Types.ObjectId, ref: 'user' }]
})

export const User = model<IUser>('user', userSchema);
export const UserGroup = model<IUserGroup>('userGroup', userGroupSchema)
export const Appliance = model<IAppliance>('appliance', applianceSchema)