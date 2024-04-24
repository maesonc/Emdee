import express from 'express';
import {
    get,
    merge
} from 'lodash';

import {
   verifyJWT 
} from '../helpers';

// Authenticate JWT here!

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {

        if (!req.cookies['JWT-TOKEN']) {
            return res.sendStatus(403);
        }

        const jwtToken = req.cookies['JWT-TOKEN'];
        if (!jwtToken) {
            return res.sendStatus(403);
        }

	if(!verifyJWT(jwtToken)){
            return res.sendStatus(403);
	}

        return next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {

	const { id } = req.params;
	const currentUserId = get(req, 'identity._id') as string;

	if(!currentUserId){
            return res.status(403).send('User ID does not exist.');
	}

	if(currentUserId.toString() !== id){
            return res.status(403).send('You do not have access to this user.');
	}

	return next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
