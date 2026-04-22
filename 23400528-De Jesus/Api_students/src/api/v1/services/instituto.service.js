import Instituto from '../models/Instituto.js';
import boom from '@hapi/boom';
import { OK, FAIL } from '../../../middlewares/resp.handler.js';

// BR: Obtener todos los institutos
export const getInstitutoList = async () => {
    try {
        return await Instituto.find();
    } catch (error) {
        throw boom.internal(error);
    }
};

// BR: Obtener un instituto por ID
export const getInstitutoItem = async (id, keyType = 'OK') => {
    try {
        let institutoItem = null;

        if (keyType === 'OK') {
            institutoItem = await Instituto.findOne({ IdInstitutoOK: id });
        } else if (keyType === 'BK') {
            institutoItem = await Instituto.findOne({ IdInstitutoBK: id });
        }

        return institutoItem;
    } catch (error) {
        throw boom.internal(error);
    }
};

// BR: Crear un nuevo instituto
export const postInstituto = async (paInstitutoItem) => {
    try {
        const newInstitutoItem = new Instituto(paInstitutoItem);
        const savedInstitutoItem = await newInstitutoItem.save();
        return OK('Instituto agregado correctamente.', savedInstitutoItem);
    } catch (error) {
        return FAIL('No se pudo agregar el instituto.', error);
    }
};

// BR: Actualizar un instituto
export const putInstitutoItem = async (id, paInstitutoItem, keyType = 'OK') => {
    try {
        let query = {};

        if (keyType === 'OK') {
            query = { IdInstitutoOK: id };
        } else if (keyType === 'BK') {
            query = { IdInstitutoBK: id };
        }

        const updatedInstituto = await Instituto.findOneAndUpdate(
            query,
            { $set: paInstitutoItem },
            {
                returnDocument: 'after',
                runValidators: true,
            }
        );

        return updatedInstituto;
    } catch (error) {
        throw boom.badImplementation(error);
    }
};

// BR: Eliminar un instituto
export const deleteInstitutoItem = async (id, keyType = 'OK') => {
    try {
        let query = {};

        if (keyType === 'OK') {
            query = { IdInstitutoOK: id };
        } else if (keyType === 'BK') {
            query = { IdInstitutoBK: id };
        }

        return await Instituto.findOneAndDelete(query);
    } catch (error) {
        throw boom.badImplementation(error);
    }
};