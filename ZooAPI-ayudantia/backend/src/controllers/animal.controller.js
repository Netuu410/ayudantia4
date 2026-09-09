import * as animalService from '../services/animal.service.js';

export const getAnimales = async (req, res, next) => {
  try {
    const animales = await animalService.getAllAnimales(req.query);
    res.json(animales);
  } catch (error) {
    next(error);
  }
};

export const getAnimalById = async (req, res, next) => {
  try {
    const animal = await animalService.getAnimalById(req.params.id);
    if (!animal) return res.status(404).json({ error: 'Animal no encontrado' });
    res.json(animal);
  } catch (error) {
    next(error);
  }
};

export const createAnimal = async (req, res, next) => {
  try {
    const animal = await animalService.createAnimal(req.body);
    res.status(201).json(animal);
  } catch (error) {
    next(error);
  }
};

export const updateAnimal = async (req, res, next) => {
  try {
    const animal = await animalService.updateAnimal(req.params.id, req.body);
    res.json(animal);
  } catch (error) {
    next(error);
  }
};

export const deleteAnimal = async (req, res, next) => {
  try {
    await animalService.deleteAnimal(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};