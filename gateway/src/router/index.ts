import express from 'express';
import routes from './routes.json';

const router = express.Router();

export default ():express.Router =>{
	router.get('/users',(req:express.Request,res:express.Response)=>{
		res.status(200).json({"h":"h"});
	});
	return router;
}
