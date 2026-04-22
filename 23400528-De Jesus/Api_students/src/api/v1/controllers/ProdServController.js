import * as ProdServService from '../services/prodServ.service.js';

// GET ALL
export async function getProdServAll(req, res) {
  try {
    const data = await ProdServService.getProdServAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// GET BY ID
export async function getProdServById(req, res) {
  try {
    const data = await ProdServService.getProdServById(req.params.id);
    if (!data) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// POST
export async function createProdServ(req, res) {
  try {
    const data = await ProdServService.createProdServ(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// PUT
export async function updateProdServ(req, res) {
  try {
    const data = await ProdServService.updateProdServ(req.params.id, req.body);
    if (!data) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// DELETE
export async function deleteProdServ(req, res) {
  try {
    const data = await ProdServService.deleteProdServ(req.params.id);
    if (!data) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}