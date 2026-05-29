import { Request, Response } from 'express';
import { Metas } from "./metasModel";

const normalizeLocalDate = (value?: string | Date) => {
  if (!value) {
    return new Date();
  }

  const dateValue = typeof value === 'string' ? value : value.toISOString();
  const datePart = dateValue.slice(0, 10);

  return new Date(`${datePart}T12:00:00`);
};

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

    const { title, description, amount, amountSaved , date, deadline, saved, completed } = req.body;
    const finalSaved = completed ?? saved;
    const finalDate = deadline ?? date;
    if (title == null || description == null || amount == null || finalSaved == null || amountSaved == null) {
      return res.status(400).json({
        message: 'Campos obrigatórios: title, description, amount, saved/completed',
        missingFields: {
          title: title == null,
          description: description == null,
          amount: amount == null,
          amountSaved: amountSaved == null,
          saved: finalSaved == null
        }
      });
    }
    const newMeta = new Metas({
      userId,
      title,
      description,
      amount: Number(amount),
      amountSaved: Number(amountSaved),
      date: normalizeLocalDate(finalDate),
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
    const { title, description, amount, amountSaved, date, deadline, saved, completed } = req.body;
    const finalSaved = completed ?? saved;
    const finalDate = deadline ?? date;
    if (title == null || description == null || amount == null || finalSaved == null || amountSaved == null) {
      return res.status(400).json({
        message: 'Campos obrigatórios: title, description, amount, saved/completed',
        missingFields: {
          title: title == null,
          description: description == null,
          amount: amount == null,
          amountSaved: amountSaved == null,
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
        amountSaved: Number(amountSaved),
        date: normalizeLocalDate(finalDate),
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

export const patchMetaAmountSaved = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'ID não encontrado' });
    }

    const { amountSaved } = req.body;
    if (amountSaved == null) {
      return res.status(400).json({ message: 'Campo obrigatório: amountSaved' });
    }

    const meta = await Metas.findOne({ _id: id, userId });
    if (!meta) {
      return res.status(404).json({ message: 'Meta não encontrada ou sem permissão' });
    }

    const nextAmountSaved = Number(amountSaved);
    const shouldBeSaved = nextAmountSaved >= Number(meta.amount);

    const updatedMeta = await Metas.findOneAndUpdate(
      { _id: id, userId },
      {
        amountSaved: nextAmountSaved,
        saved: shouldBeSaved
      },
      {
        new: true,
        runValidators: true
      }
    );

    return res.json({
      data: updatedMeta,
      message: 'Valor da meta atualizado com sucesso',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('patchMetaAmountSaved error:', error);
    res.status(500).json({ message: 'Erro ao atualizar o valor guardado', error: error instanceof Error ? error.message : error });
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