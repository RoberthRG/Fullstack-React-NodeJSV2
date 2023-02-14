import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FuentePagos from "./pages/FuentePagos";
import HistorialdePagos from "./pages/HistorialdePagos";
import ReportePagos from "./pages/ReportePagos";
import ReporteSeguimiento from "./pages/ReporteSeguimiento";
import CrearCuentas from "./pages/CrearCuentas";

const RoutesS = () => {
    return (
        <Routes>
            <Route exact path="/" element={<HomePage />}>
            </Route>
            <Route exact path="/fuentesdepago" element={<FuentePagos />}>                
            </Route>
            <Route exact path="/historialdepagos" element={<HistorialdePagos />}>
            </Route>
            <Route exact path="/reporte-pagos" element={<ReportePagos/>}>
            </Route>
            <Route exact path="/reporte-seguimiento" element={<ReporteSeguimiento/>}>
            </Route>
            <Route exact path="/crearpago" element={<CrearCuentas/>}>
            </Route>
        </Routes>
    );
};

export default RoutesS;
