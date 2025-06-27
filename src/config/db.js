require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

const conectarDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB conectado a Atlas');
  } catch (error) {
    console.error('Error de conexión a MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = conectarDB;
