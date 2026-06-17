import { Request, Response, NextFunction } from "express";
import z from "zod";

export function validate<T>(schema: z.ZodSchema<T>, callback: (req: Request, res: Response) => any) {
  return (req: Request, res: Response) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: z.treeifyError(result.error).errors,
        // 예: { username: ['최소 3자'], password: ['대문자 포함'] }
      });
    }
    req.body = result.data; // trim 등 transform도 반영됨
    return callback(req, res);
  };
}