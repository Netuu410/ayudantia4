import { Router } from 'express';
import {
  getAnimales,
  getAnimalById,
  createAnimal,
  updateAnimal,
  deleteAnimal,
} from '../controllers/animal.controller.js';
import {
  getComentariosByAnimal,
  createComentario,
} from '../controllers/comentario.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createAnimalSchema, updateAnimalSchema, filtroAnimalSchema } from '../schemas/animal.schema.js';
import { createComentarioSchema } from '../schemas/comentario.schema.js';
import { idParamSchema } from '../schemas/especie.schema.js';

const router = Router();

router.get('/', validate(filtroAnimalSchema, 'query'), getAnimales);
router.get('/:id', validate(idParamSchema, 'params'), getAnimalById);
router.post('/', validate(createAnimalSchema, 'body'), createAnimal);
router.put('/:id', validate(idParamSchema, 'params'), validate(updateAnimalSchema, 'body'), updateAnimal);
router.delete('/:id', validate(idParamSchema, 'params'), deleteAnimal);

// Endpoints anidados - comentarios de un animal específico
router.get('/:id/comments', validate(idParamSchema, 'params'), getComentariosByAnimal);
router.post('/:id/comments', validate(idParamSchema, 'params'), validate(createComentarioSchema, 'body'), createComentario);

export default router;