import { z } from 'zod';
import { extendZod, zId } from '@zodyac/zod-mongoose';
import { zodSchema } from "@zodyac/zod-mongoose";
import { model } from "mongoose";

extendZod(z);

export const zUser = z.object({
  username: z.string().min(4).max(16),
  email: z.string().email(),
  groups: z.array(zId('group')).default([]),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date())
});

export const zAppliance = z.object({
  name: z.string().min(4).max(16),
  group: zId('Group'),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date())
})

export const zGroup = z.object({
  name: z.string().min(4).max(16),
  admin: zId('user'),
  users: z.array(zId('User')),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date())
})

export const userSchema = zodSchema(zUser);
export const applianceSchema = zodSchema(zAppliance);
export const groupSchema = zodSchema(zGroup);

export const userModel = model('user', userSchema);
export const applianceModel = model('appliance', applianceSchema);
export const groupModel = model('group', groupSchema);
