import { Router } from 'express';
import * as prodServController from '../controllers/prodserv.controller.js';

const router = Router();

// -----------------------------------------------------
// BR: GET
// -----------------------------------------------------

// BR: Obtener todos los productos/servicios
router.get('/', prodServController.getProdServList);

// BR: Obtener un producto/servicio por ID
router.get('/:id', prodServController.getProdServItem);

// -----------------------------------------------------
// BR: POST
// -----------------------------------------------------

// BR: Crear un nuevo producto/servicio
router.post('/', prodServController.postProdServItem);

// 🔥 NUEVO (7.1.2)

// BR: Agregar estatus a un producto/servicio
router.post('/:id/estatus', prodServController.postProdServEstatus);

// BR: Agregar archivo a un producto/servicio
router.post('/:id/archivo', prodServController.postProdServArchivo);

// -----------------------------------------------------
// BR: PUT
// -----------------------------------------------------

// BR: Actualizar un producto/servicio por ID
router.put('/:id', prodServController.putProdServItem);

// -----------------------------------------------------
// BR: DELETE
// -----------------------------------------------------

// BR: Eliminar un producto/servicio por ID
router.delete('/:id', prodServController.deleteProdServItem);

export default router;