import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import React from 'react';
//import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import FormSelect from 'react-bootstrap/esm/FormSelect';
import "bootstrap/dist/css/bootstrap.css";


class FuentePagos extends React.Component {

    state = {
        menuFuentesPago: [],
        modalsito: 'crear',
        abierto: false,
        validated: true,
        tipoPago: [],
        form: {
            //fp_descripcion: '',
            //cdgo_tipo_pago: '',
            //nro_cuenta_bancaria: '',
            //estado: '',
        }
    }



    //METODO PARA PRESENTAR LA INFORMACION EN PANTALLA
    //Mostrar los datos al abrir la web
    componentDidMount() {
        this.peticionGet();
        this.peticionGetTipoPago();
    }

    //METODOS GET
    //Obtener los datos de tipos de Pago
    peticionGetTipoPago = () => {
        axios
            .get("https://fullstack-reactjs-nodejs.herokuapp.com/tipoPago")
            .then((response) => {
                console.log(response);
                this.setState({ tipoPago: response.data })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    //Obtener todos los datos de los Fuentes de Pago
    peticionGet = () => {
        axios.get("https://fullstack-reactjs-nodejs.herokuapp.com/menuFuentesPago").then(response => {
            this.setState({ menuFuentesPago: response.data });
        })
    }

    //METODOS POST
    //Crear una Fuente
    peticionPost = async () => {
        if (!this.state.validated) {
            await axios.post("https://fullstack-reactjs-nodejs.herokuapp.com/agregarFuente", this.state.form).then(response => {
                //this.abrirModal();
                this.peticionGet();
            }).catch(error => {
                console.log(error.message);
            });
        }
    }

    //METODOS PUT
    //Editar la informacion
    peticionPut = () => {
        axios.put("https://fullstack-reactjs-nodejs.herokuapp.com/editarFuente", this.state.form).then(response => {
            //this.abrirModal();
            this.peticionGet();
        })
    }

    //Cambiar los valores al modificarlos dentro de la web

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
    handleChangeBoolean = async e => {
        e.persist();
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.checked
            }
        });
        console.log(this.state.form);
    }

    handleSubmit = (event) => {
        const form = event.currentTarget;
        //console.log(form)
        if (form.checkValidity() === true) {
            event.preventDefault();
            event.stopPropagation();
            this.state.validated = false;
            if (this.state.modalsito === 'crear') {
                this.peticionPost();
            } else if (this.state.modalsito === 'editar') {
                this.peticionPut();
            }
            this.abrirModal();
        } else {
            event.preventDefault();
            event.stopPropagation();
            this.state.validated = true;
        }
        //this.state.validated = true;
        console.log(this.state.validated)
        console.log(this.state.modalsito)
        //form.checkValidity = true;
        this.state.validated = true;
        //console.log(form.checkValidity())
    };

    //METODOS PARA LOS MODAL
    //Abrir el modal
    abrirModal = () => {
        this.setState({ abierto: !this.state.abierto });
    }

    //Seleccionar Fuente para Editar
    seleccionarFuentePago = (elemento) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                id_fuentes_pago: elemento.id_fuentes_pago,
                fp_descripcion: elemento.fp_descripcion,
                cdgo_tipo_pago: elemento.tp_descripcion,
                estado: elemento.estado,
                nro_cuenta_bancaria: elemento.nro_cuenta_bancaria
            }
        })
    }

    seleccionarTipoPago = () => {
        this.setState({
            form: {
                id_fuentes_pago: '',
                fp_descripcion: '',
                cdgo_tipo_pago: 'Cheque',
                //estado: elemento.estado,
                nro_cuenta_bancaria: ''
            }
        })
    }

    validar = () => {
        this.setState({ validated: true });

    }

    render() {
        const { form } = this.state;
        return (
            <>
                <br />
                <br />
                <div className="container">
                    <h1>Fuentes de Pago</h1>
                </div>
                <div className="container text-center">
                    <div className="mb-2">
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                            <Col sm={1}>
                                <Button onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.abrirModal(); this.seleccionarTipoPago(); console.log(this.state.validated); this.state.modalsito = 'crear'; console.log(this.state.modalsito) }} variant="primary" size="lg" >
                                    Crear
                                </Button>
                            </Col>
                            <Col></Col>
                            {/* 
                            <Col sm={3}>
                                <Form.Control type="text" placeholder="Numero de Pago" />
                            </Col>
                            
                            <Col sm={2}>
                                <Button variant="outline-secondary">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </Button>{' '}
                            </Col>
                            */}
                        </Form.Group>
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
                                            <Button onClick={() => { this.seleccionarFuentePago(elemento); this.abrirModal(); this.state.modalsito = 'editar'; console.log(this.state.modalsito) }} variant="danger" size="lg">
                                                <i className="fa-solid fa-pen"></i>
                                            </Button>{' '}
                                        </div>
                                    </td>
                                    <td>{elemento.id_fuentes_pago}</td>
                                    <td>{elemento.fp_descripcion}</td>
                                    <td>{elemento.tp_descripcion}</td>
                                    <td>
                                        <div className="text-center text-top">
                                            <Form.Check readOnly checked={elemento.estado} type="switch" id="custom-switch"></Form.Check>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
                <Modal isOpen={this.state.abierto}>
                    <ModalHeader >
                        Fuentes de Pagos
                    </ModalHeader>
                    <ModalBody>
                        <div className="container">
                            <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} className="mb-3" controlId="validationCustom01">
                                        <Form.Label>Descripción</Form.Label>
                                        <Form.Control required as="textarea" rows={3} name="fp_descripcion" onChange={this.handleChange} value={form ? form.fp_descripcion : ''} />
                                        <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            Ingrese una Descripción por favor.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} className="mb-3" controlId="formHorizontalEmail">
                                        <Form.Label column>Tipo de Pago</Form.Label>
                                        <Col sm={10}>
                                            {this.state.tipoModal === 'insertar' ?
                                                <Form.Select name="cdgo_tipo_pago" onChange={this.handleChange}>
                                                    {this.state.tipoPago.map(elemento => (
                                                        <option onChange={this.handleChange}>{elemento.cdgo_tipo_pago}</option>
                                                    ))}
                                                </Form.Select> :
                                                <FormSelect value={form.cdgo_tipo_pago} name="cdgo_tipo_pago" onChange={this.handleChange}>
                                                    {this.state.tipoPago.map(elemento => (
                                                        <option>{elemento.cdgo_tipo_pago}</option>
                                                    ))}
                                                </FormSelect>
                                            }
                                        </Col>
                                        <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} className="mb-3" controlId="formHorizontalEmail">
                                        <Form.Label column sm={2}>Estado</Form.Label>
                                        {this.state.tipoModal === 'insertar' ?
                                            <Form.Check readOnly checked={true} type="switch" id="custom-switch"></Form.Check>
                                            : <Form.Check onChange={this.handleChangeBoolean} defaultChecked={this.state.form.estado} type="switch" name="estado"></Form.Check>
                                        }
                                    </Form.Group>
                                </Row>
                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                                    <Form.Label column>
                                        Número de Cuenta Bancaria
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control required type="text" placeholder="220444789" name="nro_cuenta_bancaria" onChange={this.handleChange} value={form ? form.nro_cuenta_bancaria : ''} />
                                        <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            Llene el campo por favor.
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                {this.state.tipoModal === 'insertar' ?
                                    <Button type="submit" size="lg">Insertar</Button> :
                                    <Button type="submit" size="lg">Actualizar</Button>
                                }
                                <Button variant="secondary" onClick={() => this.abrirModal()} type="button" size="lg">Cancelar</Button>
                            </Form>
                        </div>
                    </ModalBody>
                    <ModalFooter>

                    </ModalFooter>
                </Modal>
            </>
        )
    }
}
export default FuentePagos;