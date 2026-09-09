import { z } from 'zod';

export const createAnimalSchema = z.object({
  nombre: z.string().min(2, 'El nombre es obligatorio').max(100),
  edad: z.number().int().nonnegative('La edad no puede ser negativa'),
  peso: z.number().positive().optional(),
  disponible: z.boolean().default(true),
  especieId: z.number().int().positive('Debe indicar una especie válida'),
  recintoId: z.number().int().positive('Debe indicar un recinto válido'),
});

export const updateAnimalSchema = createAnimalSchema.partial();

export const filtroAnimalSchema = z.object({
  especieId: z.string().regex(/^\d+$/).transform(Number).optional(),
  recintoId: z.string().regex(/^\d+$/).transform(Number).optional(),
});