import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlenght: [3, 'O mínimo de caracteres é 3']
	},
	phone: {
		type: String,
		required: false,
	},
	email: {
		type: String,
		required: true,
		minlenght: [9, 'O mínimo de caracteres é 9']
	},
	adress: {
		type: String,
		required: false,
	},
	city: {
		type: String,
		required: false,
	},
	state: {
		type: String,
		required: false
	},
	corpId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Empresa',
	}
});

export const Supplier = mongoose.model('Supplier', supplierSchema);