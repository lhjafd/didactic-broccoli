import { randomInt } from "crypto";

const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

export function randomString(len: number) {
    let str = "";

    for (let i = 0; i < len; i++) {
        str += char[randomInt(char.length)];
    }

    return str;
}