import prisma from '../config/prisma.js';

export const getAllEspecies = () => {
  return prisma.especie.findMany({
    include: { _count: { select: { animales: true } } },
  });
};

export const getEspecieById = (id) => {
  return prisma.especie.findUnique({
    where: { id },
    include: { animales: true },
  });
};

export const createEspecie = (data) => {
  return prisma.especie.create({ data });
};

export const updateEspecie = (id, data) => {
  return prisma.especie.update({ where: { id }, data });
};

export const deleteEspecie = (id) => {
  return prisma.especie.delete({ where: { id } });
};