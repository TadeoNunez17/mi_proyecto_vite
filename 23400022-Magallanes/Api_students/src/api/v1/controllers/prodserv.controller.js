import * as ProdServServices from '../services/prodServ.service.js';
import boom from '@hapi/boom';

// -----------------------------------------------------
//  API GET
// -----------------------------------------------------

// Obtener todos los productos/servicios
export const getProdServList = async (req, res, next) => {
  try {
    const prodServList = await ProdServServices.getProdServList();

    if (!prodServList || prodServList.length === 0) {
      throw boom.notFound('No se encontraron productos/servicios registrados.');
    }

    res.status(200).json(prodServList);
  } catch (error) {
    next(error);
  }
};

// Obtener un producto/servicio por ID
export const getProdServItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const keyType = req.query.keyType || 'OK';

    const prodServItem = await ProdServServices.getProdServItem(id, keyType);

    if (!prodServItem) {
      throw boom.notFound('No se encontró el producto/servicio.');
    }

    res.status(200).json(prodServItem);
  } catch (error) {
    next(error);
  }
};

// -----------------------------------------------------
//  API POST
// -----------------------------------------------------

//  Crear producto/servicio
export const postProdServItem = async (req, res, next) => {
  try {
    const paProdServItem = req.body;
    const newProdServItem = await ProdServServices.postProdServ(paProdServItem);

    if (newProdServItem.fail) {
      res.status(409).json(newProdServItem);
    } else if (newProdServItem.success) {
      res.status(201).json(newProdServItem);
    }
  } catch (error) {
    next(error);
  }
};

// Agregar un estatus al arreglo cat_prod_serv_estatus
export const postProdServEstatus = async (req, res, next) => {
  try {
    //  Se obtiene el id del producto/servicio desde la URL
    const { id } = req.params;

    //  Se obtiene el tipo de llave, por default OK
    const keyType = req.query.keyType || 'OK';

    //  Se obtiene el objeto estatus desde el body
    const objEstatus = req.body;

    // Se llama al servicio para agregar el estatus
    const response = await ProdServServices.pushProdServEstatus(
      id,
      objEstatus,
      keyType
    );

    //  Si hubo error controlado, se responde con 409
    if (response.fail) {
      res.status(409).json(response);
    } else if (response.success) {
      //  Si fue exitoso, se responde con 201
      res.status(201).json(response);
    }
  } catch (error) {
    next(error);
  }
};

// Agregar un archivo al arreglo cat_prod_serv_archivos
export const postProdServArchivo = async (req, res, next) => {
  try {
    //  Se obtiene el id del producto/servicio desde la URL
    const { id } = req.params;

    //  Se obtiene el tipo de llave, por default OK
    const keyType = req.query.keyType || 'OK';

    //  Se obtiene el objeto archivo desde el body
    const objArchivo = req.body;

    //  Se llama al servicio para agregar el archivo
    const response = await ProdServServices.pushProdServArchivo(
      id,
      objArchivo,
      keyType
    );

    //  Si hubo error controlado, se responde con 409
    if (response.fail) {
      res.status(409).json(response);
    } else if (response.success) {
      //  Si fue exitoso, se responde con 201
      res.status(201).json(response);
    }
  } catch (error) {
    next(error);
  }
};

// -----------------------------------------------------
//  API PUT
// -----------------------------------------------------

//  Actualizar producto/servicio
export const putProdServItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const keyType = req.query.keyType || 'OK';
    const paProdServItem = req.body;

    const updatedProdServItem = await ProdServServices.putProdServItem(
      id,
      paProdServItem,
      keyType
    );

    if (!updatedProdServItem) {
      throw boom.badRequest('No se pudo actualizar el Producto y/o Servicio.');
    }

    res.status(200).json(updatedProdServItem);
  } catch (error) {
    next(error);
  }
};

// -----------------------------------------------------
//  API DELETE
// -----------------------------------------------------

//  Eliminar producto/servicio
export const deleteProdServItem = async (req, res, next) => {
  try {
    //  Se obtiene el id enviado en la ruta
    const { id } = req.params;

    //  Se obtiene el tipo de llave enviado como query, por default OK
    const keyType = req.query.keyType || 'OK';

    //  Se llama al servicio DELETE
    const deletedProdServItem = await ProdServServices.deleteProdServItem(
      id,
      keyType
    );

    //  Si no se encontró el registro, se lanza error
    if (!deletedProdServItem) {
      throw boom.notFound('No se encontró el Producto y/o Servicio a eliminar.');
    }

    //  Si la eliminación fue exitosa, se responde con status 200
    res.status(200).json(deletedProdServItem);
  } catch (error) {
    next(error);
  }
};