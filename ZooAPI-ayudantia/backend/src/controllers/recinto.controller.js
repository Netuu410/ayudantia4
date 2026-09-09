import * as recintoService from '../services/recinto.service.js';

export const getRecintos = async (req, res, next) => {
  try {
    const recintos = await recintoService.getAllRecintos();
    res.json(recintos);
  } catch (error) {
    next(error);
  }
};

export const getRecintoById = async (req, res, next) => {
  try {
    const recinto = await recintoService.getRecintoById(req.params.id);
    if (!recinto) return res.status(404).json({ error: 'Recinto no encontrado' });
    res.json(recinto);
  } catch (error) {
    next(error);
  }
};

export const createRecinto = async (req, res, next) => {
  try {
    const recinto = await recintoService.createRecinto(req.body);
    res.status(201).json(recinto);
  } catch (error) {
    next(error);
  }
};

export const updateRecinto = async (req, res, next) => {
  try {
    const recinto = await recintoService.updateRecinto(req.params.id, req.body);
    res.json(recinto);
  } catch (error) {
    next(error);
  }
};

export const deleteRecinto = async (req, res, next) => {
  try {
    await recintoService.deleteRecinto(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};