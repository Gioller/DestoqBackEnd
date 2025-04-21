import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Nome é um campo requerido'],
		minlegth: [3, 'O minimo de caracteres é 3'],
	},
	lastName: {
		type: String,
		required: [true, 'Sobrenome é um campo requerido'],
		minlength: [3, 'O minimo de caracteres é 3'],
	},
	CPF: {
		type: String,
		required: [true, 'CPF é um campo requerido'],
		minlegth: [11, 'O minimo de caracteres é 11'],
		maxlength: [11, 'O maximo de caracteres é 11']
	},
	email: {
		type: String,
		required: [true, 'E-mail é obrigatório']
	},
	password: {
		type: String,
		required: [true, 'Senha é obrigatória'],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	corpId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Empresa',
	},
}, {
	versionKey: false,
});

export const User = mongoose.model('User', userSchema);