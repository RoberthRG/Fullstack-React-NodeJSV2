import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { Component, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

const baseURL = "http://localhost:3799/menuFuentesPago";

class BasicExample extends Component {

    state = {
        menuFuentesPago: []
    }

    componentDidMount() {
        axios
            .get("http://localhost:3799/menuFuentesPago")
            .then((response) => {
                console.log(response);
                this.setState({ menuFuentesPago: response.data })
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render() {
        return (
            <div className="container">
                <div className="text-center">
                    <h1 >
                        <Badge bg="secondary" >Fuentes de Pago</Badge>
                    </h1>
                </div>
                <div className="mb-2">
                    <Button variant="primary" size="lg" >
                        Crear
                    </Button>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Acciones</th>
                            <th>Fuente de Pago</th>
                            <th>Descripción</th>
                            <th>Tipo de Pago</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.menuFuentesPago.map(elemento => (
                            <tr>
                                <td>
                                    <div className="mb-2 text-center">
                                        <Button variant="primary" size="lg">
                                            Editar
                                        </Button>{' '}
                                    </div>
                                    <div className="mb-2 text-center">
                                        <Button variant="danger" size="lg" >
                                            Eliminar
                                        </Button>{' '}
                                    </div>
                                </td>
                                <td>{elemento.id_fuentes_pago}</td>
                                <td>{elemento.fp_descripcion}</td>
                                <td>{elemento.tp_descripcion}</td>
                                <td>
                                    <div className="text-center text-top">
                                        <input type="checkbox" checked={elemento.estado} ></input>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default BasicExample;