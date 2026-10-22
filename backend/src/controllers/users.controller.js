import { catchAsync } from '../utils/catchAsync.js';
import { NotFoundError } from '../utils/appErrors.js'
import jwt from 'jwt-simple'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv';


class UsersController {
  constructor(repository) {
    this.repository = repository;
    this.secretKey = process.env.SECRET_KEY
  }

  checkAuth = catchAsync(async (req, res) => {
    const { login, password } = req.body;

    try {
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
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7) // 7 дней
      };
      
      const token = jwt.encode(payload, this.secretKey);

      return res.json({ token, error: null });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
  })
}

import UsersRepository from '../repositories/users.repository.js';
export default new UsersController(UsersRepository);
