import * as especieService from '../services/especie.service.js';

export const getEspecies = async (req, res, next) => {
  try {
    const especies = await especieService.getAllEspecies();
    res.json(especies);
  } catch (error) {
    next(error);
  }
};

export const getEspecieById = async (req, res, next) => {
  try {
    const especie = await especieService.getEspecieById(req.params.id);
    if (!especie) return res.status(404).json({ error: 'Especie no encontrada' });
    res.json(especie);
  } catch (error) {
    next(error);
  }
};

export const createEspecie = async (req, res, next) => {
  try {
    const especie = await especieService.createEspecie(req.body);
    res.status(201).json(especie);
  } catch (error) {
    next(error);
  }
};

export const updateEspecie = async (req, res, next) => {
  try {
    const especie = await especieService.updateEspecie(req.params.id, req.body);
    res.json(especie);
  } catch (error) {
    next(error);
  }
};

export const deleteEspecie = async (req, res, next) => {
  try {
    await especieService.deleteEspecie(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};