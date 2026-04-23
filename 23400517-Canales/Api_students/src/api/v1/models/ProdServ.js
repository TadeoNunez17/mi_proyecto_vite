import * as mongoose from 'mongoose';

const prodservSchema = new mongoose.Schema({
    // BR: Llaves principales del producto/servicio
    IdProdServPK: { type: Number, required: true },
    IdProdServOK: { type: String },
    IdProdServBK: { type: String },

    // BR: Llaves de producto padre o maestro
    IdProdServMaOK: { type: String },
    IdProdServMaBK: { type: String },

    // BR: Datos generales
    DesProdServ: { type: String },
    IdMedidaOK: { type: String },
    IdMedidaBK: { type: String },

    // BR: Campos adicionales que sí existen en la BD
    Precio: { type: Number },
    Stock: { type: Number },
    Categoria: { type: String },
    Marca: { type: String },
    Modelo: { type: String },
    Color: { type: String },
    Capacidad: { type: String },
    Energia: { type: String },
    GarantiaMeses: { type: Number },

    // BR: Arreglo de estatus
    cat_prod_serv_estatus: [
        {
            Estado: { type: String },
            Fecha: { type: Date },
            detail_row: {
                FechaReg: { type: Date, default: Date.now },
                UsuarioReg: { type: String }
            },
            _id: false,
        },
    ],

    // BR: Arreglo de archivos
    cat_prod_serv_archivos: [
        {
            Tipo: { type: String },
            URL: { type: String },
            detail_row: {
                FechaReg: { type: Date, default: Date.now },
                UsuarioReg: { type: String },
                FechaUltMod: { type: Date, default: Date.now },
                UsuarioMod: { type: String },
                Activo: { type: String, default: 'S' },
                Borrado: { type: String, default: 'N' }
            },
            _id: false,
        },
    ],

    // BR: Datos de control del registro
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
    'cat_prod_serv',
    prodservSchema,
    'cat_prod_serv'
);