import argon2 from "argon2";

export async function hash(plainStr: string): Promise<string> {
    return await argon2.hash(plainStr);
}

export async function verify(
    plainStr: string,
    hashedStr: string
): Promise<boolean> {
    return await argon2.verify(hashedStr, plainStr);
}