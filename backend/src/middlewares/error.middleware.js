export default (err, useless_1, res, useless_2) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Внутренняя ошибка сервера';

  if (!err.isOperational) {
    console.error('💥 КРИТИЧЕСКАЯ СИСТЕМНАЯ ОШИБКА:', err);
    
    if (process.env.NODE_ENV === 'production') {
      message = 'Что-то не так на сервере';
    }
  } else {
    console.warn(`⚠️ [${statusCode}] Ошибка бизнес-логики: ${message}`);
  }

  res.status(statusCode).json({
    status: err.status || 'error',
    message: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
