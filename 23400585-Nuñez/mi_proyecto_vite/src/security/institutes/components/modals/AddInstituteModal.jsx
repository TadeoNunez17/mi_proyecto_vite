import React, { useState } from "react";
import {
    Dialog, DialogContent,
    Typography, TextField, Box, Alert,
    Stack, Chip, Divider, InputAdornment, MenuItem, Button
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import TagIcon from "@mui/icons-material/Tag";
import BadgeIcon from "@mui/icons-material/Badge";
import BusinessIcon from "@mui/icons-material/Business";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InstituteValues } from "../../helpers/InstituteValues";
import { AddOneInstitute } from "../../services/remote/post/AddOneInstitute";

const fieldConfig = [
    { id: "IdInstitutoOK", label: "ID Instituto OK", placeholder: "Ej: 10", icon: <TagIcon sx={{ fontSize: 18, color: "#1a56db" }} /> },
    { id: "IdInstitutoBK", label: "ID Instituto BK", placeholder: "Ej: 18DIT0103Z", icon: <BadgeIcon sx={{ fontSize: 18, color: "#1a56db" }} /> },
    { id: "DesInstituto", label: "Nombre del Instituto", placeholder: "Ej: Instituto Tecnológico de...", icon: <AccountBalanceIcon sx={{ fontSize: 18, color: "#1a56db" }} /> },
    { id: "IdTipoGiroOK", label: "Tipo de Giro", placeholder: "Ej: EDUCACION", icon: <BusinessIcon sx={{ fontSize: 18, color: "#1a56db" }} /> },
];

const fieldSx = {
    mb: 2,
    "& .MuiOutlinedInput-root": { borderRadius: "10px", backgroundColor: "#fafcff", fontSize: "0.875rem", "&:hover fieldset": { borderColor: "#1a56db" }, "&.Mui-focused fieldset": { borderColor: "#1a56db", borderWidth: "1.5px" } },
    "& .MuiInputLabel-root.Mui-focused": { color: "#1a56db" },
};

const AddInstituteModal = ({ AddInstituteShowModal, setAddInstituteShowModal, refetchData }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");

    const formik = useFormik({
        initialValues: {
            IdInstitutoOK: "", IdInstitutoBK: "", DesInstituto: "",
            Matriz: "", IdTipoGiroOK: "", IdInstitutoSupOK: "",
        },
        validationSchema: Yup.object({
            IdInstitutoOK: Yup.string().required("Campo requerido"),
            IdInstitutoBK: Yup.string().required("Campo requerido"),
            DesInstituto: Yup.string().required("Campo requerido"),
            Matriz: Yup.string().required("Campo requerido").matches(/^[NS]$/, "Solo S o N"),
            IdTipoGiroOK: Yup.string().required("Campo requerido"),
        }),
        onSubmit: async (values) => {
            setMensajeErrorAlert("");
            setMensajeExitoAlert("");
            try {
                const Institute = InstituteValues(values);
                await AddOneInstitute(Institute);
                setMensajeExitoAlert("¡Instituto guardado con éxito!");
                refetchData(); // 👈 recarga la tabla
            } catch (e) {
                setMensajeErrorAlert("No se pudo guardar el instituto.");
            }
        },
    });

    const isDisabled = !!mensajeExitoAlert;

    return (
        <Dialog
            open={AddInstituteShowModal}
            onClose={() => setAddInstituteShowModal(false)}
            fullWidth
            maxWidth="sm"
            slotProps={{
                paper: { sx: { borderRadius: "16px", boxShadow: "0 20px 60px rgba(0,0,0,0.12)", overflow: "hidden" } }
            }}
        >
            <form onSubmit={formik.handleSubmit}>

                {/* Header */}
                <Box sx={{ px: 3, pt: 3, pb: 2, backgroundColor: "#fff" }}>
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                        <Box sx={{ width: 40, height: 40, borderRadius: "10px", backgroundColor: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #dbeafe" }}>
                            <AccountBalanceIcon sx={{ color: "#1a56db", fontSize: 20 }} />
                        </Box>
                        <Box>
                            <Typography sx={{ fontWeight: 700, fontSize: "1rem", color: "#0f172a" }}>Agregar Nuevo Instituto</Typography>
                            <Typography sx={{ fontSize: "0.75rem", color: "#94a3b8" }}>Completa los campos requeridos</Typography>
                        </Box>
                        <Chip label="Nuevo" size="small" sx={{ ml: "auto !important", backgroundColor: "#eff6ff", color: "#1a56db", fontWeight: 600, fontSize: "0.7rem", border: "1px solid #bfdbfe" }} />
                    </Stack>
                </Box>

                <Divider sx={{ borderColor: "#f1f5f9" }} />

                {/* Campos */}
                <DialogContent sx={{ px: 3, pt: 2.5, pb: 1, backgroundColor: "#f8fafc" }}>
                    {fieldConfig.map((field) => (
                        <TextField
                            key={field.id}
                            id={field.id}
                            name={field.id}
                            label={field.label}
                            placeholder={field.placeholder}
                            value={formik.values[field.id]}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            fullWidth
                            disabled={isDisabled}
                            error={formik.touched[field.id] && Boolean(formik.errors[field.id])}
                            helperText={formik.touched[field.id] && formik.errors[field.id]}
                            sx={fieldSx}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Box sx={{ width: 28, height: 28, borderRadius: "7px", backgroundColor: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #dbeafe", mr: 0.5 }}>
                                                {field.icon}
                                            </Box>
                                        </InputAdornment>
                                    ),
                                }
                            }}
                        />
                    ))}

                    {/* Campo Matriz */}
                    <TextField
                        id="Matriz"
                        name="Matriz"
                        label="Tipo de Instituto"
                        select
                        value={formik.values.Matriz}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        fullWidth
                        disabled={isDisabled}
                        error={formik.touched.Matriz && Boolean(formik.errors.Matriz)}
                        helperText={formik.touched.Matriz && formik.errors.Matriz}
                        sx={fieldSx}
                        slotProps={{
                            select: {
                                renderValue: (selected) => (
                                    <Chip
                                        label={selected === "S" ? "Matriz" : "Sucursal"}
                                        size="small"
                                        sx={selected === "S"
                                            ? { backgroundColor: "#dbeafe", color: "#1a56db", fontWeight: 600, fontSize: "0.7rem", border: "1px solid #bfdbfe" }
                                            : { backgroundColor: "#f1f5f9", color: "#64748b", fontWeight: 600, fontSize: "0.7rem", border: "1px solid #e2e8f0" }
                                        }
                                    />
                                ),
                            }
                        }}
                    >
                        <MenuItem value="S">
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Chip label="Matriz" size="small" sx={{ backgroundColor: "#dbeafe", color: "#1a56db", fontWeight: 600, fontSize: "0.7rem", border: "1px solid #bfdbfe" }} />
                                <Typography variant="body2">Instituto principal</Typography>
                            </Stack>
                        </MenuItem>
                        <MenuItem value="N">
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Chip label="Sucursal" size="small" sx={{ backgroundColor: "#f1f5f9", color: "#64748b", fontWeight: 600, fontSize: "0.7rem", border: "1px solid #e2e8f0" }} />
                                <Typography variant="body2">Instituto secundario</Typography>
                            </Stack>
                        </MenuItem>
                    </TextField>
                </DialogContent>

                {/* Alertas y acciones */}
                <Box sx={{ px: 3, pb: 3, pt: 2, backgroundColor: "#f8fafc" }}>
                    {mensajeErrorAlert && <Alert severity="error" sx={{ mb: 2, borderRadius: "10px", fontSize: "0.82rem" }}>{mensajeErrorAlert}</Alert>}
                    {mensajeExitoAlert && <Alert severity="success" sx={{ mb: 2, borderRadius: "10px", fontSize: "0.82rem" }}>{mensajeExitoAlert}</Alert>}
                    <Stack direction="row" spacing={1.5} justifyContent="flex-end">
                        <Button
                            color="secondary"
                            startIcon={<CloseIcon />}
                            variant="outlined"
                            onClick={() => setAddInstituteShowModal(false)}
                            sx={{ borderRadius: "10px", textTransform: "none", fontWeight: 600, fontSize: "0.85rem", borderColor: "#e2e8f0", color: "#64748b", "&:hover": { borderColor: "#94a3b8", backgroundColor: "#f8fafc" } }}
                        >
                            Cerrar
                        </Button>
                        <Button
                            type="submit"
                            color="primary"
                            startIcon={<SaveIcon />}
                            variant="contained"
                            disabled={isDisabled}
                            sx={{ borderRadius: "10px", textTransform: "none", fontWeight: 600, fontSize: "0.85rem", backgroundColor: "#1a56db", boxShadow: "0 4px 12px rgba(26,86,219,0.3)", "&:hover": { backgroundColor: "#1e40af" } }}
                        >
                            Guardar
                        </Button>
                    </Stack>
                </Box>
            </form>
        </Dialog>
    );
};

export default AddInstituteModal;