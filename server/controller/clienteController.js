import {clientesModelo} from '../postgres/postgres.js';
import { v4 as uuidv4 } from "uuid";
export const getAllCli=async(req, res)=>{
    try {
        const clientes= await clientesModelo.findAll();
        if(clientes.length==0){
            return res.status(200).json({"error":"No hay clientes registrados"});
        }
        return res.status(200).json(clientes);
    } catch(error) {
        console.log(error);
        return res.status(500).json({"error":"Error interno al obtener los clientes"}); 
    }
}
export const addCli=async(req, res)=>{
    const {nombre, nit, nrc, giro, correo, telefono, direccion} = req.body;
    try {
        const clientes = await clientesModelo.findOne({where: {nit: nit}});
        if(clientes==null){
            await clientesModelo.create(req.body);
            return res.status(201).json({"error":"Cliente creado con éxito"});
        }
        return res.status(200).json({message: "El cliente ya existe"});
    } catch(error) {
        console.log(error);
        return res.status(500).json({"error":"Error interno al agregar el cliente"}); 
    }
}

export const updateCli=async(req, res)=>{
    const {cliId} = req.params;
    const {nombre, nit, nrc, giro, correo, telefono, direccion} = req.body;
    console.log("hhhh");
    try {
        const clientes = await clientesModelo.findOne({where: {id: cliId}});
        if(clientes!=null){
            await clientesModelo.update(req.body, {where: {id: cliId}});
            return res.status(200).json({message: "Cliente actualizado"});
        }
        return res.status(404).json({message: "Cliente no encontrado"});
    } catch(error) {
        console.log(error);
        return res.status(500).json({"error":"Error interno al actualizar el cliente"}); 
    }
}


export const deleteCli=async(req, res)=>{
    const {cliId} = req.params;
    try {
        const clientes = await clientesModelo.findOne({where: {id: cliId}});
        if(clientes!=null){
            await clientesModelo.destroy({where: {id: cliId}});
            return res.status(200).json({message: "Cliente eliminado"});
        }
        return res.status(404).json({message: "Cliente no encontrado"});
    } catch(error) {
        console.log(error);
        return res.status(500).json({"error":"Error interno al eliminar el cliente"}); 
    }
}