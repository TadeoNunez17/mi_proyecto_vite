import { Box } from "@mui/material";
// Importamos tu tabla falsa (que guardaste en la misma carpeta 'tabs')
import InstitutesList from "./InstitutesList"; 

export default function InstitutesTab() {
  return (
    <Box sx={{ mt: 2 }}>
      
      <InstitutesList />

    </Box>
  );
}