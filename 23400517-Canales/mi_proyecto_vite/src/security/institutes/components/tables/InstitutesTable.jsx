import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MaterialReactTable } from "material-react-table";
import {
  Box, Stack, Tooltip, IconButton, Typography,
  Chip, Paper, Divider
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AddInstituteModal from "../modals/AddInstituteModal";

const professionalTheme = createTheme({
  palette: {
    primary: { main: "#1a56db" },
    background: { default: "#f8fafc", paper: "#ffffff" },
  },
  typography: {
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
  },
  components: {
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-head": {
            backgroundColor: "#f1f5f9",
            color: "#475569",
            fontWeight: 700,
            fontSize: "0.75rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            borderBottom: "2px solid #e2e8f0",
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover td": {
            backgroundColor: "#f0f7ff !important",
            transition: "background-color 0.15s ease",
          },
          "&:last-child td": { borderBottom: 0 },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid #f1f5f9",
          padding: "14px 16px",
          fontSize: "0.875rem",
          color: "#334155",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid #e8edf2",
        },
      },
    },
  },
});

const MatrizBadge = ({ value }) => {
  const isMatriz = value === "S";
  return (
    <Chip
      label={isMatriz ? "Matriz" : "Sucursal"}
      size="small"
      sx={{
        backgroundColor: isMatriz ? "#dbeafe" : "#f1f5f9",
        color: isMatriz ? "#1a56db" : "#64748b",
        fontWeight: 600,
        fontSize: "0.7rem",
        height: "22px",
        letterSpacing: "0.03em",
        border: isMatriz ? "1px solid #bfdbfe" : "1px solid #e2e8f0",
      }}
    />
  );
};

const InstitutesColumns = [
  {
    accessorKey: "IdInstitutoOK",
    header: "ID OK",
    size: 80,
    Cell: ({ cell }) => (
      <Typography sx={{ fontWeight: 700, color: "#1a56db", fontSize: "0.85rem", fontFamily: "'DM Mono', monospace" }}>
        #{cell.getValue()}
      </Typography>
    ),
  },
  {
    accessorKey: "IdInstitutoBK",
    header: "ID BK",
    size: 120,
    Cell: ({ cell }) => (
      <Typography sx={{ fontFamily: "'DM Mono', monospace", fontSize: "0.82rem", color: "#64748b", backgroundColor: "#f8fafc", px: 1, py: 0.3, borderRadius: "6px", border: "1px solid #e2e8f0", display: "inline-block" }}>
        {cell.getValue()}
      </Typography>
    ),
  },
  {
    accessorKey: "DesInstituto",
    header: "Instituto",
    size: 220,
    Cell: ({ cell }) => (
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <Box sx={{ width: 32, height: 32, borderRadius: "8px", backgroundColor: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "1px solid #dbeafe" }}>
          <AccountBalanceIcon sx={{ fontSize: 16, color: "#1a56db" }} />
        </Box>
        <Typography sx={{ fontWeight: 600, color: "#1e293b", fontSize: "0.875rem" }}>
          {cell.getValue()}
        </Typography>
      </Stack>
    ),
  },
  {
    accessorKey: "Matriz",
    header: "Tipo",
    size: 100,
    Cell: ({ cell }) => <MatrizBadge value={cell.getValue()} />,
  },
];

const InstitutesTable = ({ refetchData }) => {
  const InstitutesData = useSelector((state) => state.institutesReducer.institutesDataArr);
  const [AddInstituteShowModal, setAddInstituteShowModal] = useState(false);

  return (
    <ThemeProvider theme={professionalTheme}>
      <Paper elevation={0}>
        {/* Header */}
        <Box sx={{ px: 3, py: 2.5, backgroundColor: "#fff" }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack spacing={0.3}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <AccountBalanceIcon sx={{ color: "#1a56db", fontSize: 22 }} />
                <Typography sx={{ fontWeight: 700, fontSize: "1.1rem", color: "#0f172a" }}>
                  Institutos
                </Typography>
                <Chip
                  label={`${InstitutesData.length} registros`}
                  size="small"
                  sx={{ backgroundColor: "#eff6ff", color: "#1a56db", fontWeight: 600, fontSize: "0.7rem", height: "20px", border: "1px solid #bfdbfe" }}
                />
              </Stack>
              <Typography sx={{ fontSize: "0.78rem", color: "#94a3b8" }}>
                Directorio de instituciones registradas
              </Typography>
            </Stack>
            <Tooltip title="Agregar instituto">
              <IconButton
                onClick={() => setAddInstituteShowModal(true)}
                sx={{ backgroundColor: "#1a56db", color: "#fff", width: 38, height: 38, borderRadius: "10px", "&:hover": { backgroundColor: "#1e40af", transform: "scale(1.05)" }, transition: "all 0.15s ease" }}
              >
                <AddCircleIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>

        <Divider sx={{ borderColor: "#f1f5f9" }} />

        <MaterialReactTable
          columns={InstitutesColumns}
          data={InstitutesData}
          enableColumnActions={false}
          enableDensityToggle={false}
          enableFullScreenToggle={false}
          renderTopToolbarCustomActions={() => null}
          muiTablePaperProps={{ elevation: 0, sx: { borderRadius: 0 } }}
          muiTopToolbarProps={{ sx: { backgroundColor: "#fff", borderBottom: "1px solid #f1f5f9" } }}
          muiBottomToolbarProps={{ sx: { backgroundColor: "#fff", borderTop: "1px solid #f1f5f9" } }}
          enableStickyHeader
          muiTableContainerProps={{
              sx: { maxHeight: "250px" } // 👈 ajusta esta altura a tu gusto
          }}
        
        />
      </Paper>

      <AddInstituteModal
        AddInstituteShowModal={AddInstituteShowModal}
        setAddInstituteShowModal={setAddInstituteShowModal}
        refetchData={refetchData}
      />
    </ThemeProvider>
  );
};

export default InstitutesTable;