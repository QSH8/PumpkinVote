import pool from '../config/db.js';

class BaseRepository {
  constructor(tableName) {
    this.pool = pool;
    this.tableName = tableName;
  }

  async getAll() {
    const { rows } = await this.pool.query(
      `SELECT * FROM ${this.tableName} ORDER BY id ASC`
    );
    return rows;
  }

  async findById(id) {
    const { rows } = await this.pool.query(
      `SELECT * FROM ${this.tableName} WHERE id = $1`, 
      [id]
    );
    return rows[0] || null;
  }

  async create(data) {
    console.log('create')
    
    const keys = Object.keys(data);
    const values = Object.values(data);
    
    // Формируем плейсхолдеры: $1, $2, $3...
    const placeholders = keys.map((_, index) => `$${index + 1}`).join(', ');
    const columns = keys.join(', ');

    const query = `
      INSERT INTO ${this.tableName} (${columns}) 
      VALUES (${placeholders}) 
      RETURNING *
    `;

    const { rows } = await this.pool.query(query, values);
    return rows[0];
  }

  async update(id, data) {
    console.log('update')

    const keys = Object.keys(data);
    const values = Object.values(data);
    
    // Формируем строку: name=$1, price=$2...
    const setClause = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');
    
    // Добавляем ID в конец массива значений для условия WHERE
    values.push(id); 
    const idPlaceholder = `$${values.length}`;

    const query = `
      UPDATE ${this.tableName} 
      SET ${setClause} 
      WHERE id = ${idPlaceholder} 
      RETURNING *
    `;

    const { rows } = await this.pool.query(query, values);
    return rows[0] || null;
  }
}

export default BaseRepository;
