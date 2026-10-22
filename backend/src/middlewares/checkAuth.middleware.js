import jwt from 'jwt-simple'


export default (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Ожидаем формат "Bearer TOKEN"
  console.log('token', token);
  
  if (!token) {
    return res.status(401).json({ error: 'Доступ запрещен. Требуется авторизация.' });
  }

  try {
    const decoded = jwt.decode(token, process.env.SECRET_KEY);
    
    if (decoded.exp <= Math.floor(Date.now() / 1000)) {
      return res.status(401).json({ error: 'Срок действия токена истек' });
    }

    req.user = {
      id: decoded.userId,
      team_id: decoded.teamId // Извлекли из токена
    };
    next();
  } catch (err) {
    console.log('err', err);
    
    return res.status(401).json({ error: 'Невалидный токен' });
  }
}