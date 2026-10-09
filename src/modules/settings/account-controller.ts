import bcrypt from 'bcrypt';
import type { NextFunction, Request, Response } from 'express';
import { User } from '../users/user-model';

interface AuthenticatedRequest extends Request {
  user: { id: string; email: string };
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const toAccount = (user: { name: string; email: string }) => ({
  name: user.name,
  email: user.email,
});

export async function getAccount(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    console.log('userId:', req.user.id, '| req.user:', req.user);
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    res.json({ data: toAccount(user) });
  } catch (err) {
    next(err);
  }
}

export async function updateAccount(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
  
    const name = String(req.body.name ?? '').trim();
    const email = String(req.body.email ?? '').trim().toLowerCase();

    if (name.length < 2) {
      return res.status(400).json({ message: 'Nome inválido.' });
    }
    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ message: 'E-mail inválido.' });
    }

    const taken = await User.findOne({ email, _id: { $ne: req.user.id } });
    if (taken) {
      return res.status(409).json({ message: 'E-mail já cadastrado.' });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true, runValidators: true }
    );
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    res.json({ data: toAccount(user), message: 'Dados atualizados.' });
  } catch (err) {

    if (typeof err === 'object' && err !== null && 'code' in err && err.code === 11000) {
      return res.status(409).json({ message: 'E-mail já cadastrado.' });
    }
    next(err);
  }
}

export async function changePassword(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { currentPassword, newPassword } = req.body;

    if (typeof currentPassword !== 'string' || typeof newPassword !== 'string') {
      return res.status(400).json({ message: 'Dados inválidos.' });
    }
  
    if (newPassword.length < 8 || newPassword.length > 72) {
      return res.status(400).json({ message: 'A nova senha deve ter entre 8 e 72 caracteres.' });
    }
    if (newPassword === currentPassword) {
      return res.status(400).json({ message: 'A nova senha deve ser diferente da atual.' });
    }

    const user = await User.findById(req.user.id).select('+passwordHash');
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    const matches = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!matches) {
      return res.status(400).json({ message: 'Senha atual incorreta.' });
    }

    user.passwordHash = await bcrypt.hash(newPassword, 12);
    await user.save();

    res.json({ message: 'Senha alterada com sucesso.' });
  } catch (err) {
    next(err);
  }
}