import { Router, Request, Response } from 'express';
import { verifyToken } from '../middleware/auth';

const router = Router();
router.use(verifyToken);

router.get('/', async (req: Request, res: Response) => {
  const prisma = (req as any).prisma;
  const customers = await prisma.customer.findMany();
  res.json(customers);
});

router.post('/', async (req: Request, res: Response) => {
  const prisma = (req as any).prisma;
  const { name, email, phone, userId } = req.body;
  const customer = await prisma.customer.create({ data: { name, email, phone, userId } });
  res.json(customer);
});

router.get('/:id', async (req: Request, res: Response) => {
  const prisma = (req as any).prisma;
  const customer = await prisma.customer.findUnique({ where: { id: Number(req.params.id) } });
  res.json(customer);
});

router.put('/:id', async (req: Request, res: Response) => {
  const prisma = (req as any).prisma;
  const { name, email, phone } = req.body;
  const customer = await prisma.customer.update({
    where: { id: Number(req.params.id) },
    data: { name, email, phone },
  });
  res.json(customer);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const prisma = (req as any).prisma;
  await prisma.customer.delete({ where: { id: Number(req.params.id) } });
  res.json({ success: true });
});

export default router;
