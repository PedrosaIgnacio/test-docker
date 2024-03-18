import * as z from 'zod';

export const authenticateUserSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});