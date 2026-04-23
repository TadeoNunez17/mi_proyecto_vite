import express from 'express';
import * as ProdServController from '../controllers/ProdServController.js';

const router = express.Router();

// GET ALL
router.get('/prodserv', ProdServController.getProdServAll);

// GET BY ID
router.get('/prodserv/:id', ProdServController.getProdServById);

// POST
router.post('/prodserv', ProdServController.createProdServ);

// PUT
router.put('/prodserv/:id', ProdServController.updateProdServ);

// DELETE
router.delete('/prodserv/:id', ProdServController.deleteProdServ);

export default router;