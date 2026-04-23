import * as mongoose from 'mongoose';

const institutoSchema = new mongoose.Schema({
    IdInstitutoOK:      { type: String, required: true },
    IdInstitutoBK:      { type: String },
    DesInstituto:       { type: String },
    Alias:              { type: String },
    Matriz:             { type: String },
    Giro:               { type: String },  // 👈 en BD es Giro, no IdTipoGiroOK
    IdInstitutoSupOK:   { type: String },
    detail_row: {
        Activo:          { type: String, default: 'S' },
        Borrado:         { type: String, default: 'N' },
        detail_row_reg:  { type: Array,  default: [] }
    }
}, { collection: 'cat_institutos' });

export default mongoose.model('cat_institutos', institutoSchema);