import React from 'react';
import { NavLink } from 'react-router-dom';
import image1 from '../assets/pago-proveedores.jpg';
import image2 from '../assets/cuentasporpagar.jpg';
import image3 from '../assets/reporte1.jpg';
import image4 from '../assets/reporte2.jpg';

function HomePage() {
    return (
        <div>
            <h5> BIENVENIDO AL PANEL DE CONTROL</h5>
            <p> En este panel podra encontrar las diferentes opción para navegar</p>
            <div className='row container d-flex justify-content-center mt-3'>
                <div className='col-md-3'>
                    <div className='card '>
                        <img src={image1} alt="" />
                        <div className='card-body'>
                            <NavLink variant='primary' to = '/fuentesdepago' className='nav-item nav-link text-center' >FUENTES DE PAGO</NavLink>
                        </div>
                    </div>
                </div >
                <div className='col-md-4'>
                    <div className='card'>
                        <img src={image2} alt="" />
                        <div className='card-body'>
                            <NavLink variant='primary' to = "/historialdepagos" className='nav-item nav-link text-center'>HISTORIAL DE PAGOS</NavLink>
                        </div>
                    </div>
                </div >
                <div className='col-md-3'>
                    <div className='card'>
                        <img src={image3} alt="" />
                        <div className='card-body'>
                            <NavLink variant='primary' to = "/reporte-pagos" className='nav-item nav-link text-center'>REPORTE DE PAGOS</NavLink>
                        </div>
                    </div>
                </div >
                <h1> </h1>
                <div className='col-md-4'>
                    <div className='card'>
                        <img src={image4} alt="" />
                        <div className='card-body'>
                            <NavLink variant='primary' to= "/reporte-seguimiento" className='nav-item nav-link text-center'>REPORTE DE SEGUIMIENTO</NavLink>
                        </div>
                    </div>
                </div >
            </div>
        </div>
    );
}

export default HomePage;