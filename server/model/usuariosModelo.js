import { DataTypes } from "sequelize";
export const createUsuarioModel = async(sequelize) => {
const usuarios = sequelize.define('usuarios', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nit: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    nrc: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    giro: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    direccion: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, { 
    timestamps: false 
}
);
return usuarios;
}
