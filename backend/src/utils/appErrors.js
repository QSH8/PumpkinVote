export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// 404: Ресурс не найден (Not Found)
export class NotFoundError extends AppError {
  constructor(message = 'Ресурс не найден') {
    super(message, 404);
  }
}

// 400: Неверные данные от клиента (Bad Request)
export class BadRequestError extends AppError {
  constructor(message = 'Некорректный запрос') {
    super(message, 200);
  }
}

// 401: Не авторизован (Unauthorized)
export class UnauthorizedError extends AppError {
  constructor(message = 'Требуется авторизация') {
    super(message, 401);
  }
}
