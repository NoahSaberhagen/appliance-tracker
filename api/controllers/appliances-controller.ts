import express from 'express';
import { Appliance } from '../db/models';
import { IAppliance } from '../db/types';

export async function createApplianceController(req: any, res: any) {
  const { name } = req.params

  if (!name) {
    console.error('missing property "name" for appliance')
    res.send(400)
  }

  const appliance = new Appliance<IAppliance>({
    name
  })

  try {
    await appliance.save()
    console.log('created appliance')
    res.send(200)
  } catch (e) {
    console.error(e)
    res.send(500)
  }
}
