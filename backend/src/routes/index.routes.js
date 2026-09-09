// enrutador central - conecta todos los sub-enrutadores bajo /api

import { Router } from 'express';
import especieRoutes from './especie.routes.js';
import recintoRoutes from './recinto.routes.js';
import animalRoutes from './animal.routes.js';

const router = Router();

router.use('/especies', especieRoutes);
router.use('/recintos', recintoRoutes);
router.use('/animals', animalRoutes);

export default router;