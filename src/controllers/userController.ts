import { Request, Response } from 'express';
import { User } from '../models/userSchema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserController {
	//Funçao de registrar user
	async register(req: Request, res: Response) {
		try {

			//Checa se ja existe o user no db pelo email
			const userExists = await User.findOne({ email: req.body.email });
			if (userExists) {
				res.status(403).json('Usuário já existe');
			} else {
				//Hash de password
				const salt = await bcrypt.genSalt(10);
				const hashedPassword = await bcrypt.hash(req.body.password, salt);

				//Definiçao do novo usuario
				const newUser = new User({
					name: req.body.name,
					lastName: req.body.lastName,
					CPF: req.body.CPF,
					email: req.body.email,
					password: hashedPassword,
				});

				//Registra o novo usuario
				const user = await newUser.save();
				res.status(201).json(user);
			}
		} catch (err) {
			res.status(500).json(err);
		}
	}

	//Funçao de login
	async login(req: Request, res: Response) {
		try {
			//Checa se ja existe o user no db pelo email
			const userExists = await User.findOne({ email: req.body.email });
			if (!userExists) {
				res.status(404).json('Usuário não registrado');
			} else{
				const validPassword = await bcrypt.compare(req.body.password, userExists.password);
				if(!validPassword){res.status(401).json('Login negado')}

				const token = await jwt.sign({id:userExists.id}, `${process.env.SECRET}`, {expiresIn:86400});
				if(userExists && token){
					res.status(200).json({token, userExists});
				}
			}
		} catch (err) {
			res.status(500).json('ERRO INTERNO');
		}
	}


	async getAllUsers(req: Request, res: Response){
		try{
			const getUsers = await User.find({});
			res.status(200).json(getUsers);
		} catch(err){
			res.status(500).json('Erro no servidor');
		}
	}
}