import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Typography, Box, 
  Button, Dialog, DialogTitle, DialogContent, 
  DialogActions, TextField, Chip 
} from '@mui/material';

export default function InstitutesList() {
  // 1. Estado para la lista de institutos (iniciamos con tus mocks)
  const [institutes, setInstitutes] = useState([
    { id: 1, name: 'Instituto Tecnológico de Tepic', alias: 'ITT', status: 'Activo' },
    { id: 2, name: 'Universidad Autónoma de Nayarit', alias: 'UAN', status: 'Activo' },
    { id: 3, name: 'Instituto Politécnico Nacional', alias: 'IPN', status: 'Mantenimiento' },
    { id: 4, name: 'Universidad de Guadalajara', alias: 'UDG', status: 'Inactivo' },
  ]);

  // 2. Estados para el Modal y el Formulario
  const [open, setOpen] = useState(false);
  const [newInstitute, setNewInstitute] = useState({ name: '', alias: '', status: 'Activo' });

  // Funciones de control
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewInstitute({ name: '', alias: '', status: 'Activo' }); // Limpiar al cerrar
  };

  const handleChange = (e) => {
    setNewInstitute({ ...newInstitute, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (newInstitute.name && newInstitute.alias) {
      const newItem = {
        ...newInstitute,
        id: institutes.length + 1 // ID temporal
      };
      setInstitutes([...institutes, newItem]);
      handleClose();
    }
  };

  const handleDelete = (id) => {
    setInstitutes(institutes.filter(inst => inst.id !== id));
  };

  // Función para dar color a los status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Activo': return 'success';
      case 'Inactivo': return 'error';
      case 'Mantenimiento': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      {/* CABECERA */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
        <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          Gestión de Institutos
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpen} sx={{ borderRadius: 2 }}>
          + Nuevo Instituto
        </Button>
      </Box>

      {/* TABLA */}
      <TableContainer component={Paper} elevation={4} sx={{ borderRadius: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="tabla de institutos">
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Nombre del Instituto</strong></TableCell>
              <TableCell><strong>Alias</strong></TableCell>
              <TableCell><strong>Estatus</strong></TableCell>
              <TableCell align="center"><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {institutes.map((row) => (
              <TableRow key={row.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{row.id}</TableCell>
                <TableCell sx={{ fontWeight: 500 }}>{row.name}</TableCell>
                <TableCell>{row.alias}</TableCell>
                <TableCell>
                  <Chip 
                    label={row.status} 
                    color={getStatusColor(row.status)} 
                    size="small" 
                    variant="outlined" 
                  />
                </TableCell>
                <TableCell align="center">
                  <Button size="small" variant="text" color="info" sx={{ mr: 1 }}>Editar</Button>
                  <Button 
                    size="small" 
                    variant="text" 
                    color="error" 
                    onClick={() => handleDelete(row.id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* MODAL PARA NUEVO INSTITUTO */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Agregar Nuevo Instituto</DialogTitle>
        <DialogContent dividers>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Nombre del Instituto"
              name="name"
              fullWidth
              variant="outlined"
              value={newInstitute.name}
              onChange={handleChange}
            />
            <TextField
              label="Alias (Ej: ITT)"
              name="alias"
              fullWidth
              variant="outlined"
              value={newInstitute.alias}
              onChange={handleChange}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose} color="inherit">Cancelar</Button>
          <Button onClick={handleSave} variant="contained" color="primary">Guardar Instituto</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}