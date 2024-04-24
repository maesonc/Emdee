import express from 'express';
import * as auth from '../controllers/authentication';

export default (router:express.Router) =>{
	router.post('/auth/register',auth.register);
	router.post('/auth/login',auth.login);
}
