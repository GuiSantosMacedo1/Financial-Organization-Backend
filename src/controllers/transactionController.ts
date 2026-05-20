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

export const putTransactions = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { category, description, amount, date, type } = req.body;

    if(!id){
      return res.status(400).json({ message: 'ID é obrigatório'})
    }

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

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      {
        category,
        description,
        amount: Number(amount),
        date: date ? new Date(date) : new Date(),
        type
      },
      {
        new: true,
        runValidators: true
      }
    );

    if(!updatedTransaction){
      return res.status(404).json({ message: 'Transação não encontrada' });
    }
      res.json({
      data: updatedTransaction,
      message: 'Transação atualizada com sucesso',
      timestamp: new Date().toISOString()
    });
  } catch(error) {
    res.status(500).json({ message: 'Erro ao atualizar transação', error });
  }
}