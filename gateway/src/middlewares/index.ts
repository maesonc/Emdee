import express from 'express';
import {
    get,
    merge
} from 'lodash';


export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {

	// Check if EMDEE-AUTH COOKIE exists.
        if (!req.cookies['EMDEE-AUTH']) {
            return res.sendStatus(403);
        }

        const sessionToken = req.cookies['EMDEE-AUTH'];
        if (!sessionToken) {
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
