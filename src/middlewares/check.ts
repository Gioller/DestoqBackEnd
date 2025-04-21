import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export const SECRET_KEY: Secret = `${process.env.SECRET}`;

export const Check = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = await req.header('decria')?.replace('Bearer ', '');
        if (!token) {
            res.status(404).json("Token Invalido");
            return;
        }

        // Verifica se o token Bearer é válido
        const decoded = jwt.verify(token, SECRET_KEY);

        // Adiciona o token decodificado à requisição como uma propriedade `token`
        (req as CustomRequest).token = decoded;

        // Chama a próxima função na cadeia de middleware
        next();
    } catch (err) {
        res.status(401).json('Token Invalido');
    }
}