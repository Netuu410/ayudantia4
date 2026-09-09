import { z } from 'zod';

export const createRecintoSchema = z.object({
  nombre: z.string().min(2).max(100),
  ubicacion: z.string().max(150).optional(),
  capacidad: z.number().int().positive().optional(),
});

export const updateRecintoSchema = createRecintoSchema.partial();