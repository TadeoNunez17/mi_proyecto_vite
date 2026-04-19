import { InstituteModel } from "../models/InstitutesModel";

// Extrae los valores del formulario (Formik) y los asigna
// a la estructura del modelo de Instituto
export const InstituteValues = (values) => {
    let Institute = InstituteModel();
    Institute.IdInstitutoOK    = values.IdInstitutoOK;
    Institute.IdInstitutoBK    = values.IdInstitutoBK;
    Institute.DesInstituto     = values.DesInstituto;
    Institute.Alias            = values.Alias;
    Institute.Matriz           = values.Matriz;
    Institute.IdTipoGiroOK     = values.IdTipoGiroOK;
    Institute.IdInstitutoSupOK = values.IdInstitutoSupOK;
    return Institute;
};