import bcrypt from 'bcryptjs';
console.log(bcrypt.hashSync('199802', 10))
bcrypt.compare('199802', '$2b$10$rFdP6D5pZX9k6TtddvU88uSM6.T6XJxYCf8bbWjrgg2FtJH36LxOC').then((res) => console.log(res))

// Просто файл для вызова из консоли для создания хэша и копипаста его в бд. Не используется ни в одном узле приложения.