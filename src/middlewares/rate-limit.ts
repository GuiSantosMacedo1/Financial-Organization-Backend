import rateLimit from 'express-rate-limit';

export const loginLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: 'Muitas tentativas de login. Por favor, tente novamente mais tarde.' },
  standardHeaders: true,
  legacyHeaders: false,
})