import { Box, Tabs, Tab } from "@mui/material";
import { useState } from "react";

const InstitutesTabs = ["Institutos", "Negocios"];

const InstitutesNavTab = ({ currentRowInInstitutesTab, setCurrentNameTabInPrincipalTab }) => {

    // Controla el índice del tab actualmente seleccionado
    const [currenTabIndex, setCurrentTabIndex] = useState(0);

    const handleChange = (e) => {
        console.log("entro al handleChange", e.target.innerText.toUpperCase());

        // Actualiza el nombre del tab seleccionado en el componente padre
        setCurrentNameTabInPrincipalTab(e.target.innerText.toUpperCase());

        switch (e.target.innerText.toUpperCase()) {
            case "INSTITUTOS":
                setCurrentTabIndex(0);
                break;
            case "NEGOCIOS":
                setCurrentTabIndex(1);
                break;
        }
    };

    return (
        <Box sx={{ border: (theme) => `2px solid ${theme.palette.divider}`, mx: 1, padding: 0.5 }}>
            <Tabs
                value={currenTabIndex}
                variant={"fullWidth"}
                onChange={handleChange}
                aria-label="icon tabs example"
                textColor="primary"
            >
                {InstitutesTabs.map((tab) => (
                    <Tab key={tab} label={tab} disabled={currentRowInInstitutesTab === null} />
                ))}
            </Tabs>
        </Box>
    );
};

export default InstitutesNavTab;