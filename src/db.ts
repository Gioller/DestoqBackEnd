import mongoose, { Mongoose } from 'mongoose';

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@destoq.dix7v23.mongodb.net/?retryWrites=true&w=majority`).catch(error => console.log(error));