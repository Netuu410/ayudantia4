import { z } from 'zod';

export const createComentarioSchema = z.object({
  autor: z.string().min(2, 'El nombre del autor es obligatorio').max(100),
  calificacion: z.number().int().min(1, 'Mínimo 1').max(5, 'Máximo 5'),
  comentario: z.string().min(10, 'El comentario debe tener al menos 10 caracteres').max(500),
});