import bcrypt from 'bcryptjs';
// console.log(bcrypt.hashSync('cxnnx', 10))
bcrypt.compare('cxnnx', '$2b$10$4DeqA2/6emPRM6ZYmjB5X.VvSNLxAr/6Cw9oev7YWbQDLE4BRELi.').then((res) => console.log(res))

// Просто файл для вызова из консоли для создания хэша и копипаста его в бд. Не используется ни в одном узле приложения.