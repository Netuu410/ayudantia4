import prisma from '../config/prisma.js';

export const getComentariosByAnimal = async (animalId) => {
  const comentarios = await prisma.comentario.findMany({
    where: { animalId },
    orderBy: { createdAt: 'desc' },
  });

  const promedio = await prisma.comentario.aggregate({
    where: { animalId },
    _avg: { calificacion: true },
  });

  return {
    comentarios,
    averageRating: promedio._avg.calificacion ?? null,
  };
};

export const createComentario = (animalId, data) => {
  return prisma.comentario.create({
    data: { ...data, animalId },
  });
};