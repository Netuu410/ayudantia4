import { Router } from 'express';
import {
  getEspecies,
  getEspecieById,
  createEspecie,
  updateEspecie,
  deleteEspecie,
} from '../controllers/especie.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createEspecieSchema, updateEspecieSchema, idParamSchema } from '../schemas/especie.schema.js';

const router = Router();

router.get('/', getEspecies);
router.get('/:id', validate(idParamSchema, 'params'), getEspecieById);
router.post('/', validate(createEspecieSchema, 'body'), createEspecie);
router.put('/:id', validate(idParamSchema, 'params'), validate(updateEspecieSchema, 'body'), updateEspecie);
router.delete('/:id', validate(idParamSchema, 'params'), deleteEspecie);

export default router;