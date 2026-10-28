import { catchAsync } from '../utils/catchAsync.js';
import { pool } from '../config/db.js';
import jwt from 'jwt-simple'
import bcrypt from 'bcryptjs'

class UsersController {
  constructor(repository) {
    this.repository = repository;
    this.secretKey = process.env.SECRET_KEY
  }

  login = catchAsync(async (req, res) => {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'Пароль не указан' });
    }

    const { rows: users } = await pool.query(
      'SELECT * FROM users'
    );

    let targetUser = null;

    for (const user of users) {
      const isMatch = await bcrypt.compare(password, user.password_hash);
      
      if (isMatch) {
        targetUser = user;
        break;
      }
    }

    if (!targetUser) {
      return res.status(200).json({ error: 'Неверный код доступа' });
    }

    // // Проверка на то, что уже голосовал
    // const alreadyVoted = await pool.query(`
    //   SELECT EXISTS (
    //     SELECT 1 
    //     FROM votes 
    //     WHERE user_id = $1
    //   );
    // `, [targetUser.id])

    // if (alreadyVoted.rows[0].exists) {
    //   return res.status(200).json({ error: 'Ты уже голосовал)' })
    // }

    const payload = {
      userId: targetUser.id,
      teamId: targetUser.team_id,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7) // 7 дней
    };
    
    const token = jwt.encode(payload, this.secretKey);

    return res.json({
      token,
      error: null,
      user: { ...targetUser }
    });
  })
}

import UsersRepository from '../repositories/users.repository.js';
export default new UsersController(UsersRepository);
