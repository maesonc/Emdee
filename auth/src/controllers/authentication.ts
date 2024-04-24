import express from 'express';
import { getAuthByUsername,createAuth } from '../db/auth';
import { random,generate_password,generateJWT } from '../helpers';
import { Roles } from '../db/auth';


export const login = async (req: express.Request, res: express.Response) =>{
	try{
		const {username,password} = req.body;

		if(!username || !password){
			return res.sendStatus(400);
		}

		// Get the username
		const auth = await getAuthByUsername(username).select('+authentication.salt +authentication.password');

		if(!auth){
			return res.status(400).send("Auth does not exist.");
		}

		// Check password.
		const expectedHash = generate_password(auth.authentication.salt,password);
		if(auth.authentication.password != expectedHash){
			return res.status(403).send("Invalid password provided.");
		}

		// Generate JWT here.
		const jwt_token = await generateJWT(auth);

		const resp = {
			"jwt":jwt_token
		}

		return res.status(200).json(resp).end();
	}catch(error){
		console.log(error);
		return res.sendStatus(400);
	}
}
export const register = async (req: express.Request, res: express.Response) =>{
	try{
		// Get inputs from request.
		const {username,password} = req.body;

		// Validation to ensure all inputs are not null.
		if(!username || !password){
			return res.sendStatus(400);
		}

		// Check if auth w
		// ith the same username already exists.
		const existingAuth = await getAuthByUsername(username);
		if(existingAuth){
			// Remember to update the message to not show that the auth exists!
			return res.status(400).send("Auth already exists.");
		}

		const role = Roles.user;
		const salt = random();
		const user = await createAuth({
			username,
			role,
			authentication:{
				salt,
				password: generate_password(salt,password),
			},
		})

		return res.status(200).json(user).end();
	}catch(error){
		console.log(error);
		return res.sendStatus(400);
	}
}
