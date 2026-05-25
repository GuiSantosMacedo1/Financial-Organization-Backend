import { Request, Response } from "express"
import bcrypt from 'bcrypt';
import { User } from "./user-model";
import jwt from 'jsonwebtoken';
export const postUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ message:'Campos Obrigatórios: name, email, password' })
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    const existing = await User.findOne({ email:normalizedEmail });
    if(existing) {
      return res.status(409).json({ message: 'Email já foi cadastrado' })
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email: normalizedEmail, passwordHash });
    const saved = await newUser.save();

    return res.status(201).json({
      data: { id: saved._id, name: saved.name, email: saved.email, createdAt: saved.createdAt },
      message: 'Usuário criado com sucesso',
      timestamp: new Date().toISOString()
    })
  } catch(error) {
    return res.status(500).json({ message: 'Erro ao criar o usuário', error })
  }
}

export const listUsers = async (req: Request, res: Response) =>{
  try{
    const users = await User.find().select('-passwordHash');
    return res.json({
      data: users,
      message: 'Lista de usuários',
      timestamp: new Date().toISOString()
    });
  } catch(error) {
    return res.status(500).json({ message: 'Erro ao encontrar os usuários', error })
  } 
}

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if(!id) return res.status(400).json({ message: 'ID é obrigatório' })

    const user = await User.findById(id).select('-passwordHash');
    if(!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    return res.json({
      data: user,
      message: 'Usuário encontrado',
      timestamp: new Date().toISOString()
    });
  } catch(error) {
    return res.status(500).json({ message: 'Erro ao encontrar usuário', error })
  } 
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Campos obrigatórios: email, password' });

    const normalizedEmail = String(email).toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) return res.status(401).json({ message: 'Credenciais inválidas' });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ message: 'Credenciais inválidas' });

    const token = jwt.sign(
      { id: user.id.toString(), email: user.email },
      process.env.JWT_SECRET || 'changeme',
      { expiresIn: '7d' }
    );

    return res.json({ data: { token, user: { id: user._id, name: user.name, email: user.email } }, message: 'Login bem-sucedido' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao efetuar login', error });
  }
};