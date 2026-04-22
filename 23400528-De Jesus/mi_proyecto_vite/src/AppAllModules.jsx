import { RouterProvider } from "react-router-dom";
import SecurityRouter from "./navigation/NaviRoutesSecurity";
// import EducationRouter from "./navigation/NaviRoutesEducation";
// import CommerceRouter from "./navigation/NaviRoutesCommerce";
import Footer from "./share/footer/components/Footer";
// FIC: imports para Redux
import { GET_DATA_START } from "./security/redux/thunks";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function AppAllModules() {
    // Instancia del dispatch de Redux
    const dispatch = useDispatch();

    // Se ejecuta solo una vez al montar el componente
    useEffect(() => {
        dispatch(GET_DATA_START()).then(() => {
            console.log("<<END-DISPATCH>>: GET_DATA_START se ejecutó de forma correcta");
        });
    }, []);

    return (
        <>
            <div id='div-app'>
                {/* <h1>Main App - All Modules</h1> */}
                <RouterProvider router={SecurityRouter} />
                {/* <RouterProvider router={EducationRouter} /> */}
                {/* <RouterProvider router={CommerceRouter} /> */}
                <div id='div-footer'>
                    <Footer />
                </div>
            </div>
        </>
    );
}