import { Box } from "@mui/material";
import { useState } from "react";
import BusinessNavTab from "./BusinessNavTab";
import InfoAdTab from "./InfoAdTab";
import FilesTab from "./FilesTab";
import PhonsTab from "./PhonsTab";
import AddressesTab from "./AddressesTab";
import WebAddressesTab from "./WebAddressesTab";

export default function BusinessTab() {

    // Controla el negocio seleccionado en la tabla
    const [currentRowInBusinessTab, setCurrentRowInBusinessTab] = useState(1);

    // Controla el nombre del sub-tab actualmente activo. Por default: "NEGOCIOS"
    const [currentNameTabInBusinessTab, setCurrentNameTabInBusinessTab] = useState("NEGOCIOS");

    return (
        <Box>
            {/* Barra de sub-pestañas de Negocios */}
            <BusinessNavTab
                currentRowInBusinessTab={currentRowInBusinessTab}
                setCurrentNameTabInBusinessTab={setCurrentNameTabInBusinessTab}
            />

            {/* Muestra el contenido según el sub-tab seleccionado */}
            {currentNameTabInBusinessTab == "INFO ADICIONAL" && <InfoAdTab />}
            {currentNameTabInBusinessTab == "ARCHIVOS"       && <FilesTab />}
            {currentNameTabInBusinessTab == "TELEFONOS"      && <PhonsTab />}
            {currentNameTabInBusinessTab == "DIR WEBS"       && <WebAddressesTab />}
            {currentNameTabInBusinessTab == "DOMICILIOS"     && <AddressesTab />}
        </Box>
    );
}