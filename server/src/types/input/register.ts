import { z } from "zod";

export const RegisterSchema = z.object({
    username: z.string()
        .min(3, "3자 이상")
        .max(80, "80자 이하")
        .regex(/^[a-zA-Z0-9._-]+$/, "영어 대소문자, 숫자, '.', '-', '_'만 허용"),
    nickname: z.string()
        .trim()
        .min(1)
        .max(255, "255자 이하"),
    password: z.string()
        .min(4, "4자 이상")
        .regex(/^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':",./<>?\\|~`]+$/, "영어 대소문자, 숫자, 특수문자만 허용"),
});