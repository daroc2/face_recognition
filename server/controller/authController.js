import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { usuariosModelo } from "../postgres/postgres.js";
dotenv.config();


const generarToken = (usuarios) => {
    return jwt.sign(
        { id: usuarios.id, email: usuarios.correo }, // Payload (info dentro del token)
        process.env.JWT_SECRET, // Clave secreta
        { expiresIn: process.env.JWT_EXPIRES_IN } // Expiración del token
    );
};


export const login = async (req, res) => {
    const { correo, contrasena } = req.body;

    try {
        const usuario = await usuariosModelo.findOne({ where: { correo } });
        console.log("asdasd");
        if (!usuario) {
            return res.status(401).json({ mensaje: "Credenciales inválidas" });
        }

        const passwordValido = await bcrypt.compare(contrasena, usuario.contrasena);

        console.log(usuario.contrasena);
        if (!passwordValido) {
            return res.status(401).json({ mensaje: "Credenciales inválidas" });
        }

        const token = generarToken(usuario);

        
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 días
        });
        res.json({ token });

    } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor", error });
    }
};

//Agregar rutas protegidas
//Acceder a los token desde las cookis