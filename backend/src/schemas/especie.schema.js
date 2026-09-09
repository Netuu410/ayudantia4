import { z } from 'zod';

export const createEspecieSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(80),
  descripcion: z.string().max(500).optional(),
});

export const updateEspecieSchema = createEspecieSchema.partial();

export const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, 'El id debe ser numérico').transform(Number),
});