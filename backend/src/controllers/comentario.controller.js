import * as animalService from '../services/animal.service.js';
import * as comentarioService from '../services/comentario.service.js';

export const getComentariosByAnimal = async (req, res, next) => {
  try {
    const animalId = req.params.id;

    const existe = await animalService.animalExists(animalId);
    if (!existe) return res.status(404).json({ error: 'Animal no encontrado' });

    const resultado = await comentarioService.getComentariosByAnimal(animalId);
    res.json(resultado);
  } catch (error) {
    next(error);
  }
};

export const createComentario = async (req, res, next) => {
  try {
    const animalId = req.params.id;

    const existe = await animalService.animalExists(animalId);
    if (!existe) return res.status(404).json({ error: 'Animal no encontrado' });

    const comentario = await comentarioService.createComentario(animalId, req.body);
    res.status(201).json(comentario);
  } catch (error) {
    next(error);
  }
};