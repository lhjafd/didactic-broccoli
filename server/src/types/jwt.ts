import * as jwt from "jsonwebtoken";

export interface RefreshTokenPayload extends jwt.JwtPayload {
    userId: string;
}