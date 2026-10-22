import BaseRepository from './base.repository.js';

class UsersRepository extends BaseRepository {
  constructor() {
    super('users'); // Просто передаем имя таблицы в базовый класс
  }

  async getUser(login) {
    const { rows } = await this.pool.query('SELECT * FROM users WHERE login = $1', [login]);
    
    return rows[0]
  }

}

export default new UsersRepository();