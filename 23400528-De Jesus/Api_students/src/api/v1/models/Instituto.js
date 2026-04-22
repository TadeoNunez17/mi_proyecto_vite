import * as mongoose from 'mongoose';

const institutoSchema = new mongoose.Schema({
    IdInstitutoPK: { type: Number, required: true },
    IdInstitutoOK: { type: String },
    IdInstitutoBK: { type: String },

    Nombre: { type: String },
    Ciudad: { type: String },
    Estado: { type: String },
    Tipo: { type: String },
    Municipio: { type: String },
    Direccion: { type: String },
    Telefono: { type: String },
    Correo: { type: String },

    detail_row: {
        FechaReg: { type: Date, default: Date.now },
        UsuarioReg: { type: String },
        FechaUltMod: { type: Date, default: Date.now },
        UsuarioMod: { type: String },
        Activo: { type: String, default: 'S' },
        Borrado: { type: String, default: 'N' }
    }
});

export default mongoose.model(
    'cat_institutos',
    institutoSchema,
    'cat_institutos'
);