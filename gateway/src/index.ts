import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import router from './router';

const app = express();
const PORT = 8000;

app.use(cors({
	credentials: true
}))
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);
server.listen(PORT,()=>{
	console.log("Server running on http://localhost:"+PORT);
})

app.use('/',router());

