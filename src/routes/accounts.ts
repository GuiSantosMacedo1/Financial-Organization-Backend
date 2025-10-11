import { Router, Request, Response } from 'express';

const router = Router();

// Get all accounts
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Get all accounts',
    data: []
  });
});

// Get account by ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(200).json({
    message: `Get account with ID: ${id}`,
    data: {}
  });
});

// Create new account
router.post('/', (req: Request, res: Response) => {
  const accountData = req.body;
  res.status(201).json({
    message: 'Account created successfully',
    data: accountData
  });
});

// Update account
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const accountData = req.body;
  res.status(200).json({
    message: `Account ${id} updated successfully`,
    data: accountData
  });
});

// Delete account
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(200).json({
    message: `Account ${id} deleted successfully`
  });
});

export default router;
