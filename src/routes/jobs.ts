import { Router, Request, Response } from 'express';
import { verifyToken } from '../middleware/auth';

const router = Router();
router.use(verifyToken);

router.get('/', async (req: Request, res: Response) => {
  const prisma = (req as any).prisma;
  const jobs = await prisma.job.findMany();
  res.json(jobs);
});

router.post('/', async (req: Request, res: Response) => {
  const prisma = (req as any).prisma;
  const { description, status, siteId } = req.body;
  const job = await prisma.job.create({ data: { description, status, siteId } });
  res.json(job);
});

router.get('/:id', async (req: Request, res: Response) => {
  const prisma = (req as any).prisma;
  const job = await prisma.job.findUnique({ where: { id: Number(req.params.id) } });
  res.json(job);
});

router.put('/:id', async (req: Request, res: Response) => {
  const prisma = (req as any).prisma;
  const { description, status } = req.body;
  const job = await prisma.job.update({
    where: { id: Number(req.params.id) },
    data: { description, status },
  });
  res.json(job);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const prisma = (req as any).prisma;
  await prisma.job.delete({ where: { id: Number(req.params.id) } });
  res.json({ success: true });
});

export default router;
