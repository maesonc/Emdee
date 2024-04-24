import jwt from 'jsonwebtoken';
import { promises as fs } from 'fs';

interface JwtPayload {
    id: string;
    username: string;
    role: string;
}

// Verify + Decode the JWT with a public key.
export const verifyJWT = async (token:string)=>{
	const publicKey = await fs.readFile('../config/emdee_private_rsa.pub','utf-8');
	return jwt.verify(token,publicKey) as JwtPayload;
}
