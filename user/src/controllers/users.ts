import express from 'express';
import {
    get
} from 'lodash';
import {
    getUserByAuthId,
    getUserByEmail,
    createUser,
    Gender
} from '../db/users';


export const get_details = async (req: express.Request, res: express.Response) => {
    try {
        const {
            username,
            password
        } = req.body;

        if (!username || !password) {
            return res.sendStatus(400);
        }

	// get auth_id from jwt.
        const auth_id = get(req, 'identity.id') as string;

        // Get the username
        const user = await getUserByAuthId(auth_id);
        if (!user) {
            return res.status(400).send("Auth does not exist.");
        }


        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const create_user = async (req: express.Request, res: express.Response) => {
    try {
        // Get inputs from request.
        const {
            email,
            address,
            gender,
            contact,
	    auth_id 
        } = req.body;

        // Validation to ensure all inputs are not null.
        if (!email || !address || !gender || !contact) {
            return res.sendStatus(400);
        }

        // Check Gender
        if (!Object.values(Gender).includes(gender)) {
            return res.sendStatus(400);
        }

        // Check user with the same email already exists.
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            // Remember to update the message to not show that the auth exists!
            return res.status(400).send("User already exists.");
        }

        const user = await createUser({
            email,
            contact,
            gender,
            address,
            auth_id,
        })

        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
