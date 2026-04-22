import React, { useEffect, useState } from "react";
import { MaterialReactTable } from 'material-react-table';
import { Box, Stack, Tooltip, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";

// CORRECCIÓN DE RUTAS SEGÚN TU FOTO:
import { getAllInstitutes } from "../../services/remote/get/GetAllInstitutes";
import AddInstituteModal from "../modals/AddInstituteModal";

const InstitutesColumns = [
    { accessorKey: "IdInstitutoOK", header: "ID OK", size: 30 },
    { accessorKey: "IdInstitutoBK", header: "ID BK", size: 30 },
    { accessorKey: "DesInstituto", header: "INSTITUTO", size: 150 },
    { accessorKey: "Matriz", header: "MATRIZ", size: 30 },
];

const InstitutesTable = () => {
    const [loadingTable, setLoadingTable] = useState(true);
    const [InstitutesData, setInstitutesData] = useState([]);
    const [AddInstituteShowModal, setAddInstituteShowModal] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getAllInstitutes();
                setInstitutesData(data);
                setLoadingTable(false);
            } catch (error) {
                console.error(error);
                setLoadingTable(false);
            }
        }
        fetchData();
    }, []);

    return (
        <Box>
            <MaterialReactTable
                columns={InstitutesColumns}
                data={InstitutesData}
                state={{ isLoading: loadingTable }}
                renderTopToolbarCustomActions={() => (
                    <Stack direction="row" sx={{ m: 1 }}>
                        <Tooltip title="Agregar">
                            <IconButton onClick={() => setAddInstituteShowModal(true)}>
                                <AddCircleIcon color="primary" fontSize="large" />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                )}
            />

            {/* Invocación corregida */}
            <AddInstituteModal
                AddInstituteShowModal={AddInstituteShowModal}
                setAddInstituteShowModal={setAddInstituteShowModal}
            />
        </Box>
    );
};

export default InstitutesTable;