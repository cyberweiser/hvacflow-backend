import { Router, Request, Response } from 'express';
import { verifyToken } from '../middleware/auth';

const router = Router();
router.use(verifyToken);

router.get('/', async (req: Request, res: Response) => {
  const prisma = (req as any).prisma;
  const sites = await prisma.site.findMany();
  res.json(sites);
});

router.post('/', async (req: Request, res: Response) => {
  const prisma = (req as any).prisma;
  const { address, city, state, zip, customerId } = req.body;
  const site = await prisma.site.create({ data: { address, city, state, zip, customerId } });
  res.json(site);
});

router.get('/:id', async (req: Request, res: Response) => {
  const prisma = (req as any).prisma;
  const site = await prisma.site.findUnique({ where: { id: Number(req.params.id) } });
  res.json(site);
});

router.put('/:id', async (req: Request, res: Response) => {
  const prisma = (req as any).prisma;
  const { address, city, state, zip } = req.body;
  const site = await prisma.site.update({
    where: { id: Number(req.params.id) },
    data: { address, city, state, zip },
  });
  res.json(site);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const prisma = (req as any).prisma;
  await prisma.site.delete({ where: { id: Number(req.params.id) } });
  res.json({ success: true });
});

export default router;
