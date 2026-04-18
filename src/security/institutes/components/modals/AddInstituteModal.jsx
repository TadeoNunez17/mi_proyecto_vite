import React, { useState } from "react";
import {
    Dialog, DialogContent, DialogTitle, DialogActions,
    Typography, TextField, Box, Alert
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";

// CORRECCIÓN DE RUTAS SEGÚN TU FOTO:
// Para llegar a helpers desde componentes/modals subes dos niveles
import { InstituteValues } from "../../helpers/InstituteValues";
import { AddOneInstitute } from "../../services/remote/post/AddOneInstitute";

const AddInstituteModal = ({ AddInstituteShowModal, setAddInstituteShowModal }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");

    const formik = useFormik({
        initialValues: {
            IdInstitutoOK: "",
            IdInstitutoBK: "",
            DesInstituto: "",
            Matriz: "",
            IdTipoGiroOK: "",
            IdInstitutoSupOK: "",
        },
        validationSchema: Yup.object({
            IdInstitutoOK: Yup.string().required("Requerido"),
            IdInstitutoBK: Yup.string().required("Requerido"),
            DesInstituto: Yup.string().required("Requerido"),
            Matriz: Yup.string().required("Requerido").matches(/^[NS]+$/, "Solo N o S"),
            IdTipoGiroOK: Yup.string().required("Requerido"),
        }),
        onSubmit: async (values) => {
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);
            try {
                const Institute = InstituteValues(values);
                await AddOneInstitute(Institute);
                setMensajeExitoAlert("¡Guardado con éxito!");
            } catch (e) {
                setMensajeErrorAlert("Error al guardar");
            }
        },
    });

    const commonTextFieldProps = {
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
        fullWidth: true,
        margin: "dense",
        disabled: !!mensajeExitoAlert,
    };

    return (
        <Dialog open={AddInstituteShowModal} onClose={() => setAddInstituteShowModal(false)} fullWidth>
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>
                    <Typography variant="h6"><strong>Agregar Nuevo Instituto</strong></Typography>
                </DialogTitle>
                <DialogContent dividers>
                    <TextField id="IdInstitutoOK" label="IdInstitutoOK*" value={formik.values.IdInstitutoOK} {...commonTextFieldProps} error={formik.touched.IdInstitutoOK && Boolean(formik.errors.IdInstitutoOK)} helperText={formik.touched.IdInstitutoOK && formik.errors.IdInstitutoOK} />
                    <TextField id="IdInstitutoBK" label="IdInstitutoBK*" value={formik.values.IdInstitutoBK} {...commonTextFieldProps} error={formik.touched.IdInstitutoBK && Boolean(formik.errors.IdInstitutoBK)} helperText={formik.touched.IdInstitutoBK && formik.errors.IdInstitutoBK} />
                    <TextField id="DesInstituto" label="DesInstituto*" value={formik.values.DesInstituto} {...commonTextFieldProps} error={formik.touched.DesInstituto && Boolean(formik.errors.DesInstituto)} helperText={formik.touched.DesInstituto && formik.errors.DesInstituto} />
                    <TextField id="Matriz" label="Matriz* (S/N)" value={formik.values.Matriz} {...commonTextFieldProps} error={formik.touched.Matriz && Boolean(formik.errors.Matriz)} helperText={formik.touched.Matriz && formik.errors.Matriz} />
                    <TextField id="IdTipoGiroOK" label="IdTipoGiroOK*" value={formik.values.IdTipoGiroOK} {...commonTextFieldProps} error={formik.touched.IdTipoGiroOK && Boolean(formik.errors.IdTipoGiroOK)} helperText={formik.touched.IdTipoGiroOK && formik.errors.IdTipoGiroOK} />
                </DialogContent>
                <DialogActions>
                    <Box m="auto">
                        {mensajeErrorAlert && <Alert severity="error">{mensajeErrorAlert}</Alert>}
                        {mensajeExitoAlert && <Alert severity="success">{mensajeExitoAlert}</Alert>}
                    </Box>
                    <LoadingButton color="secondary" startIcon={<CloseIcon />} variant="outlined" onClick={() => setAddInstituteShowModal(false)}>CERRAR</LoadingButton>
                    <LoadingButton type="submit" color="primary" startIcon={<SaveIcon />} variant="contained" disabled={!!mensajeExitoAlert}>GUARDAR</LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default AddInstituteModal;