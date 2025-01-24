import express from 'express';
import {
  inviteCaregiver,
  // updatePermissions,
  // verifyCaregiver,
} from '../controllers/caregiver.controller';

const caregiverRouter = express.Router();

caregiverRouter.post('/invite', inviteCaregiver);
// caregiverRouter.patch('/permissions/:id', updatePermissions);
// caregiverRouter.post('/verify', verifyCaregiver);

export default caregiverRouter;
