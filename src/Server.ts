import express, { Request, Response } from 'express';
import 'dotenv/config';
import './db';
import routes from './routes/all.routes'

const app = express();

app.use(express.json());

app.use(routes);

app.listen(process.env.PORT, () => 
console.log(`Server is running on ${process.env.PORT}`)
);
app.get('/teste', (req:Request, res:Response) => {
	res.json({message:''})
});

