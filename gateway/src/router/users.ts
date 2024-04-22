import express from 'express';
import * as user from '../controllers/users';
import { isAuthenticated,isOwner } from '../middlewares';

export default (router:express.Router) =>{
	router.get('/users',isAuthenticated ,user.getAllUsers);
	router.delete('/users/:id',isAuthenticated,isOwner,user.deleteUser);
	router.patch('/users/:id',isAuthenticated,isOwner,user.updateUser);
}
