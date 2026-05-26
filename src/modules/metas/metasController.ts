import { Request, Response } from 'express';
import { Metas } from "./metasModel";

export const getMetas = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const metas = await Metas.find({ userId });
    res.json({
      data: metas,
      message: 'Lista de Metas',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter as Metas', error });
  }
}

export const postMetas = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    const { title, description, amount, date, deadline, saved, completed } = req.body;
    const finalSaved = completed ?? saved;
    const finalDate = deadline ?? date;
    if (title == null || description == null || amount == null || finalSaved == null) {
      return res.status(400).json({
        message: 'Campos obrigatórios: title, description, amount, saved/completed',
        missingFields: {
          title: title == null,
          description: description == null,
          amount: amount == null,
          saved: finalSaved == null
        }
      });
    }
    const newMeta = new Metas({
      userId,
      title,
      description,
      amount: Number(amount),
      date: finalDate ? new Date(finalDate) : new Date(),
      saved: Boolean(finalSaved)
    });
    const savedMeta = await newMeta.save();
    res.status(201).json({
      data: savedMeta,
      message: 'Meta criada com sucesso',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('postMetas error:', error);
    res.status(500).json({ message: 'Erro ao criar as Metas', error: error instanceof Error ? error.message : error });
  }
}

export const putMetas = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }
    const { id } = req.params
    if (!id) {
      return res.status(401).json({ message: 'ID não encontrado' });
    }
    const { title, description, amount, date, deadline, saved, completed } = req.body;
    const finalSaved = completed ?? saved;
    const finalDate = deadline ?? date;
    if (title == null || description == null || amount == null || finalSaved == null) {
      return res.status(400).json({
        message: 'Campos obrigatórios: title, description, amount, saved/completed',
        missingFields: {
          title: title == null,
          description: description == null,
          amount: amount == null,
          saved: finalSaved == null
        }
      });
    };
    const updatedMeta = await Metas.findOneAndUpdate(
      { _id: id, userId: (req as any).user.id },
      {
        title,
        description,
        amount: Number(amount),
        date: finalDate ? new Date(finalDate) : new Date(),
        saved: Boolean(finalSaved)
      },
      {
        new: true,
        runValidators: true
      }
    );
    if (!updatedMeta) {
      return res.status(404).json({ message: 'Transação não encontrada ou sem permissão' });
    }
    res.json({
      data: updatedMeta,
      message: 'Transação atualizada com sucesso',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('postMetas error:', error);
    res.status(500).json({ message: 'Erro ao atualizar as Metas', error: error instanceof Error ? error.message : error });
  }
}
export const deleteMetas = async (req: Request, res:Response) => {
  try{
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }
    const { id } = req.params
    if (!id) {
      return res.status(401).json({ message: 'ID não encontrado' });
    }
    const deletedTransaction = await Metas.findOneAndDelete({ _id: id, userId: (req as any).user.id });
    if(!deletedTransaction){
      return res.status(404).json({ message: 'Meta não encontrada' })
    }
    return res.json({
      message: 'Meta Excluída com Sucesso',
      timeStamp: new Date().toISOString()
    })
  } catch(error) {
    res.status(500).json({ message: 'Erro ao excluir Meta', error });
  }
}