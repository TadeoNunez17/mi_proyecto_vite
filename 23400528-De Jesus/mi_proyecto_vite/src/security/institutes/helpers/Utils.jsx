// Genera el subdocumento "detail_row"
export const getDetailRow = (activo = "S", borrado = "N", usuarioReg = "SYSTEM") => {
    return {
        Activo:         activo,
        Borrado:        borrado,
        detail_row_reg: [ getDetailRowReg(usuarioReg) ],
    };
};

// Genera el subdocumento "detail_row_reg"
export const getDetailRowReg = (usuarioReg = "SYSTEM") => {
    return {
        FechaReg:   Date.now(),
        UsuarioReg: usuarioReg,
    };
};