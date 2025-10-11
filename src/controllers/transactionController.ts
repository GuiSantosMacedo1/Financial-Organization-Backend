import { Request, Response } from 'express';
import { Transaction } from '../models/transactionModel';

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.find();
    res.json({
      data: transactions,
      message: 'Lista de transações',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter transações', error });
  }
}

export const postTransactions = async (req: Request, res: Response) => {
  try {
    const { category, description, amount, date, type } = req.body;

    if (!category || !description || !amount || !type) {
      return res.status(400).json({ 
        message: 'Campos obrigatórios: category, description, amount, type',
        missingFields: {
          category: !category,
          description: !description,
          amount: !amount,
          type: !type
        }
      });
    }

    if (type !== 'income' && type !== 'expense') {
      return res.status(400).json({ 
        message: 'Campo type deve ser "income" ou "expense"',
        received: type
      });
    }

    const newTransaction = new Transaction({
      category, 
      description, 
      amount: Number(amount), 
      date: date ? new Date(date) : new Date(),
      type 
    });
    
    const savedTransaction = await newTransaction.save();
    
    res.status(201).json({
      data: savedTransaction,
      message: 'Transação criada com sucesso',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar transação', error });
  }
}