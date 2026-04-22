import { Router } from 'express';
import * as institutoController from '../controllers/instituto.controller.js';

const router = Router();

// BR: GET - Obtener todos los institutos
router.get('/', institutoController.getInstitutoList);

// BR: GET - Obtener un instituto por ID
router.get('/:id', institutoController.getInstitutoItem);

// BR: POST - Crear un nuevo instituto
router.post('/', institutoController.postInstitutoItem);

// BR: PUT - Actualizar un instituto por ID
router.put('/:id', institutoController.putInstitutoItem);

// BR: DELETE - Eliminar un instituto por ID
router.delete('/:id', institutoController.deleteInstitutoItem);

export default router;