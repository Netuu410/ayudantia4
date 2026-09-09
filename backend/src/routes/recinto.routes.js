import { Router } from 'express';
import {
  getRecintos,
  getRecintoById,
  createRecinto,
  updateRecinto,
  deleteRecinto,
} from '../controllers/recinto.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createRecintoSchema, updateRecintoSchema } from '../schemas/recinto.schema.js';
import { idParamSchema } from '../schemas/especie.schema.js'; 

const router = Router();

router.get('/', getRecintos);
router.get('/:id', validate(idParamSchema, 'params'), getRecintoById);
router.post('/', validate(createRecintoSchema, 'body'), createRecinto);
router.put('/:id', validate(idParamSchema, 'params'), validate(updateRecintoSchema, 'body'), updateRecinto);
router.delete('/:id', validate(idParamSchema, 'params'), deleteRecinto);

export default router;