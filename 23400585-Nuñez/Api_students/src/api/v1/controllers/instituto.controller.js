import * as InstitutoServices from '../services/instituto.service.js';
import boom from '@hapi/boom';

// BR: Obtener todos los institutos
export const getInstitutoList = async (req, res, next) => {
  try {
    const institutoList = await InstitutoServices.getInstitutoList();

    if (!institutoList || institutoList.length === 0) {
      return res.status(200).json({ 
        success: false, 
        message: 'No se encontraron institutos registrados.' 
      });
    }

    res.status(200).json({ 
      success: true, 
      data: [{ dataRes: institutoList }]
    });

  } catch (error) {
    next(error);
  }
};

// BR: Obtener un instituto por ID
export const getInstitutoItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const keyType = req.query.keyType || 'OK';

    const institutoItem = await InstitutoServices.getInstitutoItem(id, keyType);

    if (!institutoItem) {
      throw boom.notFound('No se encontró el instituto.');
    }

    res.status(200).json(institutoItem);
  } catch (error) {
    next(error);
  }
};

// BR: Crear instituto
export const postInstitutoItem = async (req, res, next) => {
  try {
    const paInstitutoItem = req.body;
    const newInstitutoItem = await InstitutoServices.postInstituto(paInstitutoItem);

    if (newInstitutoItem.fail) {
      res.status(409).json(newInstitutoItem);
    } else if (newInstitutoItem.success) {
      res.status(201).json(newInstitutoItem);
    }
  } catch (error) {
    next(error);
  }
};

// BR: Actualizar instituto
export const putInstitutoItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const keyType = req.query.keyType || 'OK';
    const paInstitutoItem = req.body;

    const updatedInstitutoItem = await InstitutoServices.putInstitutoItem(
      id,
      paInstitutoItem,
      keyType
    );

    if (!updatedInstitutoItem) {
      throw boom.badRequest('No se pudo actualizar el instituto.');
    }

    res.status(200).json(updatedInstitutoItem);
  } catch (error) {
    next(error);
  }
};

// BR: Eliminar instituto
export const deleteInstitutoItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const keyType = req.query.keyType || 'OK';

    const deletedInstitutoItem = await InstitutoServices.deleteInstitutoItem(
      id,
      keyType
    );

    if (!deletedInstitutoItem) {
      throw boom.notFound('No se encontró el instituto a eliminar.');
    }

    res.status(200).json(deletedInstitutoItem);
  } catch (error) {
    next(error);
  }
};