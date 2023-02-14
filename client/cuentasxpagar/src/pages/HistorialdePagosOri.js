import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import Badge from 'react-bootstrap/Badge';
import 'bootstrap/dist/css/bootstrap.css'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { NavLink } from 'react-router-dom';

const url = "https://fullstack-reactjs-nodejs.herokuapp.com/pago";


class HistorialdePagosOri extends Component {
    
    state = {
        data: [],
        form: {
            id_cabecera: "",
        }
    };


    handleChange = async e => {
        e.persist();
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form);
    }

    abrirModal = () => {
        this.setState({ abierto: !this.state.abierto });
    }

    peticionGet = () => {
        axios.get(url).then((response) => {
            this.setState({ data: response.data });
            //console.log(response.data);
        });
    };
    peticionGetOne = (id_cabecera) => {
        axios.get(url + "/" + id_cabecera).then((response) => {
            this.setState({ data: response.data });
        });
    };

    componentDidMount() {
        this.peticionGet();
    }

    irCrear() {
        this.props.history.push("/crearpago")
    }

    render() {

        return (
            <>
                <div>
                    <div className="text-center">
                        <h1 >
                            <Badge bg="secondary" >Historial de PagosSS</Badge>
                        </h1>
                    </div>

                    <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formHorizontalPassword"
                    >
                        <Col sm={1}>
                            <NavLink variant='succes' to='/crearpago' className='nav-item nav-link text-center' >Crear</NavLink>
                        </Col>
                        <Col sm={6}></Col>
                        <Col>
                            <Button variant="outline-dark">
                                Refrescar
                            </Button>
                        </Col>
                        <Col sm={3}>
                            <Form.Select className="form-select">
                                {this.state.data.map((pago) => (
                                    <option>
                                        {pago.id_cabecera}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>
                        <Col sm={1}>
                            <Button variant="outline-dark">
                                Buscar
                            </Button>
                        </Col>
                    </Form.Group>

                    <br />
                    <br />
                    <Table className="table" striped bordered hover variant="dark"  >
                        <thead>
                            <tr>
                                <th>Acciones</th>
                                <th>Id Pago</th>
                                <th>Estado</th>
                                <th>Descripción Pago</th>
                                <th>Proveedor RUC</th>
                                <th>Tipo de Pago</th>
                                <th>Fecha de Pago</th>
                                <th>Detalles</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((pago) => {
                                let detalles = [];
                                for (let i = 0; i < pago.cab_detalle.length; i++) {
                                    detalles.push(
                                        <tr  >
                                            <td >{pago.cab_detalle[i].id_detalle}</td>
                                            <td>{pago.cab_detalle[i].cantidad_a_pagar}</td>
                                            <td>{pago.cab_detalle[i].fcom_id}</td>
                                        </tr>
                                    );
                                }

                                return (
                                    <tr>
                                        <td>
                                            <Button variant="warning">Editar</Button>
                                        </td>
                                        <td>{pago.id_cabecera}</td>
                                        <td>
                                            <div className="text-center text-top">
                                                <Form.Check readOnly checked={pago.cab_estado} type="switch" id="custom-switch"></Form.Check>
                                            </div>
                                        </td>
                                        <td >{pago.descripcion_pago}</td>
                                        <td>{pago.ruc_proveedor}</td>
                                        <td>{pago.cdgo_tipo_pago}</td>
                                        <td>{(pago.fecha_pago = new Date().toLocaleDateString())}</td>
                                        <td>
                                            <Table
                                                className="table"
                                                striped
                                                bordered
                                                hover
                                                variant="dark"
                                            >
                                                <thead>
                                                    <tr>
                                                        <th>ID Pago Factura</th>
                                                        <th>Cantidad a Pagar</th>
                                                        <th>Codigo de Factura</th>
                                                    </tr>
                                                </thead>
                                                <tbody>{detalles}</tbody>
                                            </Table>
                                        </td>
                                        <td>{pago.total}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
                <Modal isOpen={this.state.abierto}>
                    <ModalHeader>
                    </ModalHeader>
                    <ModalBody>



                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}

export default HistorialdePagosOri;