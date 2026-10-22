import { catchAsync } from '../utils/catchAsync.js';
import jwt from 'jwt-simple'
import bcrypt from 'bcryptjs'

class UsersController {
  constructor(repository) {
    this.repository = repository;
    this.secretKey = process.env.SECRET_KEY
  }

  login = catchAsync(async (req, res) => {
    const { login, password } = req.body;

      const user = await this.repository.getUser(login)

      if (!user) {
        return res.status(401).json({ token: null, error: 'Неверный логин или пароль' });
      }

      const isMatch = await bcrypt.compare(password, user.password_hash);

      if (!isMatch) {
        return res.status(401).json({ token: null, error: 'Неверный логин или пароль' });
      }

      const payload = {
        userId: user.id,
        teamId: user.team_id,
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7) // 7 дней
      };
      
      const token = jwt.encode(payload, this.secretKey);

      return res.json({
        token,
        error: null,
        user: {
          id: user.id,
          username: user.username,
          team_id: user.team_id
        }
      });
  })
}

import UsersRepository from '../repositories/users.repository.js';
export default new UsersController(UsersRepository);
