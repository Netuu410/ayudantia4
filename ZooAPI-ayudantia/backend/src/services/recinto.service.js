import prisma from '../config/prisma.js';

export const getAllRecintos = () => {
  return prisma.recinto.findMany({
    include: { _count: { select: { animales: true } } },
  });
};

export const getRecintoById = (id) => {
  return prisma.recinto.findUnique({
    where: { id },
    include: { animales: true },
  });
};

export const createRecinto = (data) => {
  return prisma.recinto.create({ data });
};

export const updateRecinto = (id, data) => {
  return prisma.recinto.update({ where: { id }, data });
};

export const deleteRecinto = (id) => {
  return prisma.recinto.delete({ where: { id } });
};