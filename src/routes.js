import { Router } from 'express';
import User from './app/models/user.js';

const routes = new Router();

routes.get('/', async (_req, res) => {
  const [user, created] = await User.findOrCreate({
    where: { email: 'oziel@email.com' },
    defaults: {
      name: 'Oziel',
      password_hash: '123456',
      admin: false,
    },
  });

  res.status(created ? 201 : 200).json(user);
});

routes.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);

    return res.status(201).json(user);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Email already exists' });
    }

    throw error;
  }
});

export default routes;
