import ProdServ from '../models/ProdServ.js';
import boom from '@hapi/boom';
import { OK, FAIL } from '../../../middlewares/resp.handler.js';

// -----------------------------------------------------
// BR: Método GET para obtener todos los productos/servicios
// Retorna la lista completa de documentos de la colección
// -----------------------------------------------------
export const getProdServList = async () => {
    try {
        const prodServList = await ProdServ.find();
        return prodServList;
    } catch (error) {
        throw boom.internal(error);
    }
};

// -----------------------------------------------------
// BR: Método GET para obtener un producto/servicio por ID
// Recibe:
//   id -> identificador del producto
//   keyType -> tipo de llave (OK o BK)
// Retorna:
//   Un solo documento encontrado
// -----------------------------------------------------
export const getProdServItem = async (id, keyType = 'OK') => {
    try {
        let prodServItem = null;

        // BR: Si la búsqueda es por llave operacional (OK)
        if (keyType === 'OK') {
            prodServItem = await ProdServ.findOne({
                IdProdServOK: id,
            });
        }
        // BR: Si la búsqueda es por llave de negocio (BK)
        else if (keyType === 'BK') {
            prodServItem = await ProdServ.findOne({
                IdProdServBK: id,
            });
        }

        return prodServItem;
    } catch (error) {
        throw boom.internal(error);
    }
};

// -----------------------------------------------------
// BR: Método POST para agregar un nuevo producto/servicio
// Recibe:
//   paProdServItem -> JSON con la información del producto
// Retorna:
//   Respuesta estandarizada con OK o FAIL
// -----------------------------------------------------
export const postProdServ = async (paProdServItem) => {
    try {
        // BR: Se crea una nueva instancia del modelo con los datos recibidos
        const newProdServItem = new ProdServ(paProdServItem);

        // BR: Se guarda el nuevo documento en la base de datos
        const savedProdServItem = await newProdServItem.save();

        // BR: Se retorna una respuesta exitosa
        return OK('Producto/Servicio agregado correctamente.', savedProdServItem);
    } catch (error) {
        // BR: Se retorna una respuesta controlada de error
        return FAIL('No se pudo agregar el producto/servicio.', error);
    }
};

// -----------------------------------------------------
// BR: Método POST para agregar un estatus al arreglo
// BR: cat_prod_serv_estatus de un producto/servicio
// Recibe:
//   id -> identificador del producto
//   objEstatus -> objeto estatus a insertar
//   keyType -> tipo de llave (OK o BK)
// Retorna:
//   Respuesta estandarizada con OK o FAIL
// -----------------------------------------------------
export const pushProdServEstatus = async (id, objEstatus, keyType = 'OK') => {
    try {
        let query = {};

        // BR: Si la búsqueda es por llave OK
        if (keyType === 'OK') {
            query = { IdProdServOK: id };
        }
        // BR: Si la búsqueda es por llave BK
        else if (keyType === 'BK') {
            query = { IdProdServBK: id };
        }

        // BR: Se agrega el nuevo objeto al arreglo cat_prod_serv_estatus
        const updatedProdServ = await ProdServ.findOneAndUpdate(
            query,
            { $push: { cat_prod_serv_estatus: objEstatus } },
            {
                returnDocument: 'after',
                runValidators: true,
            }
        );

        // BR: Si no se encontró el producto/servicio
        if (!updatedProdServ) {
            return FAIL('No se encontró el producto/servicio para agregar el estatus.', null);
        }

        return OK('Estatus agregado correctamente.', updatedProdServ);
    } catch (error) {
        return FAIL('No se pudo agregar el estatus.', error);
    }
};

// -----------------------------------------------------
// BR: Método POST para agregar un archivo al arreglo
// BR: cat_prod_serv_archivos de un producto/servicio
// Recibe:
//   id -> identificador del producto
//   objArchivo -> objeto archivo a insertar
//   keyType -> tipo de llave (OK o BK)
// Retorna:
//   Respuesta estandarizada con OK o FAIL
// -----------------------------------------------------
export const pushProdServArchivo = async (id, objArchivo, keyType = 'OK') => {
    try {
        let query = {};

        // BR: Si la búsqueda es por llave OK
        if (keyType === 'OK') {
            query = { IdProdServOK: id };
        }
        // BR: Si la búsqueda es por llave BK
        else if (keyType === 'BK') {
            query = { IdProdServBK: id };
        }

        // BR: Se agrega el nuevo objeto al arreglo cat_prod_serv_archivos
        const updatedProdServ = await ProdServ.findOneAndUpdate(
            query,
            { $push: { cat_prod_serv_archivos: objArchivo } },
            {
                returnDocument: 'after',
                runValidators: true,
            }
        );

        // BR: Si no se encontró el producto/servicio
        if (!updatedProdServ) {
            return FAIL('No se encontró el producto/servicio para agregar el archivo.', null);
        }

        return OK('Archivo agregado correctamente.', updatedProdServ);
    } catch (error) {
        return FAIL('No se pudo agregar el archivo.', error);
    }
};

// -----------------------------------------------------
// BR: Método PUT para modificar un producto/servicio
// Recibe:
//   id -> identificador del producto
//   paProdServItem -> JSON con los datos a actualizar
//   keyType -> tipo de llave (OK o BK)
// Retorna:
//   Documento actualizado
// -----------------------------------------------------
export const putProdServItem = async (id, paProdServItem, keyType = 'OK') => {
    try {
        // BR: Se define el criterio de búsqueda
        let query = {};

        // BR: Si la búsqueda es por llave OK
        if (keyType === 'OK') {
            query = { IdProdServOK: id };
        }
        // BR: Si la búsqueda es por llave BK
        else if (keyType === 'BK') {
            query = { IdProdServBK: id };
        }

        // BR: Depuración para verificar qué está llegando
        console.log('BR PUT ID:', id);
        console.log('BR PUT keyType:', keyType);
        console.log('BR PUT query:', query);
        console.log('BR PUT body:', paProdServItem);

        // BR: Se actualiza únicamente lo enviado en el body
        const updatedProdServ = await ProdServ.findOneAndUpdate(
            query,
            { $set: paProdServItem },
            {
                returnDocument: 'after',
                runValidators: true,
            }
        );

        console.log('BR PUT updatedProdServ:', updatedProdServ);

        return updatedProdServ;
    } catch (error) {
        console.log('BR PUT error:', error);
        throw boom.badImplementation(error);
    }
};

// -----------------------------------------------------
// BR: Método DELETE para eliminar un producto/servicio
// Recibe:
//   id -> identificador del producto
//   keyType -> tipo de llave (OK o BK)
// Retorna:
//   Documento eliminado
// -----------------------------------------------------
export const deleteProdServItem = async (id, keyType = 'OK') => {
    try {
        // BR: Se define el criterio de búsqueda
        let query = {};

        // BR: Si la búsqueda es por llave OK
        if (keyType === 'OK') {
            query = { IdProdServOK: id };
        }
        // BR: Si la búsqueda es por llave BK
        else if (keyType === 'BK') {
            query = { IdProdServBK: id };
        }

        // BR: Se elimina el documento encontrado
        const deletedProdServ = await ProdServ.findOneAndDelete(query);

        // BR: Se retorna el documento eliminado
        return deletedProdServ;
    } catch (error) {
        throw boom.badImplementation(error);
    }
};