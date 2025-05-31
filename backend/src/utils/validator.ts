import { ZodError, ZodSchema } from "zod";

// utils/validator.ts
export const validateRequest = (schema: ZodSchema) => (req: { body: unknown; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: ZodError<any>; }): any; new(): any; }; }; }, next: () => void) => {
    const result = schema.safeParse(req.body);
    if (!result.success) return res.status(400).json({ error: result.error });
    req.body = result.data;
    next();
  };
  