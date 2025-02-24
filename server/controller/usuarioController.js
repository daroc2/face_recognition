import {usuariosModelo} from '../postgres/postgres.js';
import { v4 as uuidv4 } from "uuid";
export const getAllUsu=async(req, res)=>{
    try {
        const usuarios= await usuariosModelo.findAll();
        if(usuarios.length==0){
            return res.status(200).json({"error":"No hay usuarios registrados"});
        }
        return res.status(200).json(usuarios);
    } catch(error) {
        console.log(error);
        return res.status(500).json({"error":"Error interno al obtener los usuarios"}); 
    }
}
export const addUsu=async(req, res)=>{
    const {nombre, nit, nrc, giro, correo, telefono, direccion, contrasena} = req.body;
    try {
        const usuarios = await usuariosModelo.findOne({where: {nit: nit}});
        if(usuarios==null){
            await usuariosModelo.create(req.body);
            return res.status(201).json({"error":"Usuario creado"});
        }
        return res.status(200).json({message: "El usuario ya existe"});
    } catch(error) {
        console.log(error);
        return res.status(500).json({"error":"Error interno al agregar el usuario"}); 
    }
}

export const updateUsu=async(req, res)=>{
    const {usuId} = req.params;
    const {nombre, nit, nrc, giro, correo, telefono, direccion,contrasena} = req.body;
    try {
        const usuarios = await usuariosModelo.findOne({where: {id: usuId}});
        if(usuarios!=null){
            await usuariosModelo.update(req.body, {where: {id: usuId}});
            return res.status(200).json({message: "Usuario actualizado"});
        }
        return res.status(404).json({message: "Uusario no encontrado"});
    } catch(error) {
        console.log(error);
        return res.status(500).json({"error":"Error interno al actualizar el usuario"}); 
    }
}

export const deleteUsu=async(req, res)=>{
    const {usuId} = req.params;
    try {
        const usuarios = await usuariosModelo.findOne({where: {id: usuId}});
        if(usuarios!=null){
            await usuariosModelo.destroy({where: {id: usuId}});
            return res.status(200).json({message: "Usuario eliminado"});
        }
        return res.status(404).json({message: "Usuario no encontrado"});
    } catch(error) {
        console.log(error);
        return res.status(500).json({"error":"Error interno al eliminar el Usuario"}); 
    }
}

export const login = async (req, res) => {
    const { correo, contrasena } = req.body;
    try {
        const usuario = await usuariosModelo.findOne({ where: { correo } });

        if (!usuario) {
            return res.status(401).json({ mensaje: "Credenciales inválidas" });
        }

        const passwordValido = await bcrypt.compare(contrasena, usuario.contrasena);

        if (!passwordValido) {
            return res.status(401).json({ mensaje: "Credenciales inválidas" });
        }

        const token = generarToken(usuario);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor", error });
    }
};