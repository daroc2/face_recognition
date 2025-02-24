import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { createClienteModel } from '../model/clientesModelo.js';
import { createUsuarioModel } from '../model/usuariosModelo.js';
dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false, // Desactiva logs SQL en consola
  });
  let clientesModelo = null;
  let usuariosModelo = null;
  const connection = async () => {    
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        
        usuariosModelo = await createUsuarioModel(sequelize);
        clientesModelo = await createClienteModel(sequelize);
        await sequelize.sync();
        console.log("Database Synced");
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
  }

  export {
        connection,
        clientesModelo,
        usuariosModelo
  }