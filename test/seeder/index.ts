import * as seeder from 'mongoose-seed';

import { hashPassword } from '../../src/common/auth';
import config from '../../src/config';

export default {
  initialize: () =>
    new Promise(resolve =>
      seeder.connect(
        process.env.MONGO_URL,
        {
          useNewUrlParser: true,
          useCreateIndex: true,
        },
        async () => {
          const data = await getData();

          seeder.clearModels(['User'], () => {
            seeder.populateModels(data, () => {
              (console as any).info('DB seed was successful');
              resolve();
            });
          });
        },
      ),
    ),
  disconnect: () =>
    new Promise(resolve => {
      // The disconnect method does not accept callback, so we wait
      seeder.disconnect();
      setTimeout(() => resolve(), 1000);
    }),
};

async function getData() {
  return [
    {
      model: 'User',
      documents: [
        {
          _id: '507f1f77bcf86cd799439011',
          email: 'foo@bar.com',
          isActive: false,
          activationToken: '16d12e06-6119-4b6e-b9c2-6530fd2f591a',
          activationExpires: Date.now() + config.auth.activationExpireInMs,
          passwordResetToken: '3bdafa11-c3d0-4f15-8811-ce4ab2da2eba',
          passwordResetExpires:
            Date.now() + config.auth.passwordResetExpireInMs,
          password: await hashPassword('password'),
        },
      ],
    },
  ];
}
