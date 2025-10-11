import { Router, Request, Response } from 'express';

const router = Router();

// Get all transactions
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Get all transactions',
    data: []
  });
});

// Get transaction by ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(200).json({
    message: `Get transaction with ID: ${id}`,
    data: {}
  });
});

// Create new transaction
router.post('/', (req: Request, res: Response) => {
  const transactionData = req.body;
  res.status(201).json({
    message: 'Transaction created successfully',
    data: transactionData
  });
});

// Update transaction
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const transactionData = req.body;
  res.status(200).json({
    message: `Transaction ${id} updated successfully`,
    data: transactionData
  });
});

// Delete transaction
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(200).json({
    message: `Transaction ${id} deleted successfully`
  });
});

export default router;
