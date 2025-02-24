import express from 'express';  
import { getAllCli, addCli, updateCli, deleteCli} from '../controller/clienteController.js';
import { getAllUsu, addUsu, updateUsu, deleteUsu} from '../controller/usuarioController.js';
import { authMiddleware } from "../controller/authMiddleware.js";
import { login } from "../controller/authController.js";

const router=express.Router();
//End point para clientes
router.get("/clientes/getAllCli",authMiddleware, getAllCli);
router.post("/clientes/addCli",addCli);
router.put("/clientes/updateCli/:cliId", updateCli);
router.delete("/clientes/deleteCli/:cliId",deleteCli);
//End point para usuarios
router.get("/usuarios/getAllUsu",getAllUsu);
router.post("/usuarios/addUsu",addUsu);
router.put("/usuarios/updateUsu/:usuId",updateUsu);
router.delete("/usuarios/deleteUsu/:usuId",deleteUsu);
router.post("/login", login);


export default router;