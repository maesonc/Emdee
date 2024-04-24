import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { promises as fs } from 'fs';
import { AuthDocument } from '../db/auth';

// SECRET for generating the password.
const SECRET = 'AUTH';

// Create a random base64 string.
export const random = () => crypto.randomBytes(128).toString('base64');

// Generate a password.
export const generate_password = (salt:string, password:string)=>{
	return crypto.createHmac('sha256',[salt,password].join('/')).update(SECRET).digest('hex');
}

// Generate a JWT with a private key.
export const generateJWT = async (auth:AuthDocument)=>{
	const secretKey = await fs.readFile(__dirname+'/../config/emdee_private_rsa','utf-8');
	const content = {
		"id":auth.id,
		"username":auth.username,
		"role":auth.role
	}
	
	return jwt.sign({ content }, secretKey, { expiresIn: '15m' });

}

// Verify the JWT with a public key.
export const verifyJWT = async (token:string)=>{
	const publicKey = await fs.readFile('../config/emdee_private_rsa.pub','utf-8');
	return jwt.verify(token, publicKey);
}
