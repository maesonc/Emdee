import express from 'express';
import * as users from '../controllers/users';
import { appendAuthIDToRequest } from '../middlewares';

export default (router:express.Router) =>{
	router.post('/user/register',users.create_user);
	router.post('/user', appendAuthIDToRequest , users.get_details);
}
