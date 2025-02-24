import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Carga las variables del .env

export const authMiddleware = (req, res, next) => {
    console.log("Tratando de validar");
    const token = req.header("Authorization"); // Leer el token de los headers

    if (!token) {
        return res.status(401).json({ mensaje: "Acceso denegado. No hay token" });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded; // Guardar el usuario en req.user
        next(); // Continuar con la siguiente función
    } catch (error) {
        res.status(401).json({ mensaje: "Token inválido" });
    }
};
