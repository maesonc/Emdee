import express from 'express';
import {
    merge
} from 'lodash';
import { verifyJWT } from '../helpers';

// Authenticate JWT here!
export const appendAuthIDToRequest = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {

        if (!req.cookies['JWT-TOKEN']) {
            return res.status(403).send('Invalid Cookie');
        }

        const jwtToken = req.cookies['JWT-TOKEN'];
        if (!jwtToken) {
            return res.status(403).send('Invalid JWT');
        }

	const jwtData = await verifyJWT(jwtToken);
	if(!jwtData){
            return res.status(403).send('Invalid JWT');
	}

	merge(req,{
		"identity":{
			"auth_id":jwtData.id,
			"role":jwtData.role
		}
	});

        return next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
