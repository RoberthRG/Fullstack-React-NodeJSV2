import { useEffect, useState } from 'react';
import { Container, Table, Button, Col, Form, Row, Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';


function numeroCompra(numero) {

    let numeroC = ``;
    if (numero < 10) {
        numeroC = `PAG-PROV-0000${numero}`
    } else if (numero >= 10 && numero < 100) {
        numeroC = `PAG-PROV-000${numero}`
    } else if (numero >= 100 && numero < 1000) {
        numeroC = `PAG-PROV-00${numero}`
    } else {
        numeroC = `PAG-PROV-0${numero}`
    }
    return numeroC
}

function restarSaldo(saldo, cantidad_a_pagar) {
    let saldoR = saldo - cantidad_a_pagar
    return saldoR
}

function totalPagos(inputarr) {
    let total = 0;
    for (let i = 0; i < inputarr.length; i++) {
        total = + inputarr[i].saldo;

    }
    return total
}

export default function CabForm() {


    //guardar las variable, capturar el estado 


    //proveedores
    const [prov, setProv] = useState([]);
    //Facuras
    const [fact, setFact] = useState([]);
    //Facturas by id
    const [factid, setFacturaId] = useState([]);
    //Cabeceras
    const [cabecera, setCabecera] = useState([]);

    //Validaciones
    const [validated, setValidated] = useState(false);

    // capturar estado de true o false 
    const [estado, setEstado] = useState(false);

    const [tPago, setTPago] = useState([]);

    const [fPago, setFPago] = useState([]);




    //Lamma el numero de registros en la cabecera 

    let numero = cabecera.length;
    //Llenar tabla de objetos 

    const [inputarr, setInputarr] = useState([])

    const [detallesP, setDetalles] = useState({
        cantidad_a_pagar: '',
        fcom_id: '',
        saldo: ''
    });


    //captrar evento
    const handleChange = e => {
        setDetalles({ ...detallesP, [e.target.name]: e.target.value });


    }

    let { cantidad_a_pagar, fcom_id } = detallesP


    const handleChang = () => {

        setInputarr([...inputarr, { cantidad_a_pagar, fcom_id, saldo: restarSaldo(factid[0].fcom_total, detallesP.cantidad_a_pagar) }])

        console.log('array', detallesP)
        setDetalles({ cantidad_a_pagar: "", fcom_id: "", saldo: restarSaldo(factid[0].fcom_total, detallesP.cantidad_a_pagar) })
    }


    const [pagos, setPagos] = useState({
        descripcion_pago: '',
        ruc_proveedor: '',
        cdgo_tipo_pago: '',
        fecha_pago: ''
    })


    // capturas datos del formulario

    const changeHandle = (e) => {
        setPagos({ ...pagos, [e.target.name]: e.target.value })
    }

    // capturar estado del checked
    const checkHandle = (e) => {
        if (!e.target.checked) {
            setEstado(false)
            console.log(estado)
        } else {
            setEstado(true)
            console.log(estado)
        }
    }


    ///Cargar Los proveedores

    const loadProv = async () => {
        const response = await fetch('https://appdistribuidascompras.herokuapp.com/proveedor')
        const data = await response.json()
        setProv(data)
        console.log(data)
    }

    // Cargar las facturas por proveedor 
    const loadFact = async (cedula_ruc) => {
        const response = await fetch(`https://appdistribuidascompras.herokuapp.com/fac_comprasPorProveedor/${cedula_ruc}`)
        const data = await response.json()
        setFact(data)
        console.log(data)
    }

    //Cargar las factiras por id de la factura
    const loadFactbyId = async (id) => {
        const response = await fetch(`https://appdistribuidascompras.herokuapp.com/fac_comprasId/${id}`)
        const data = await response.json()
        setFacturaId(data)

    }

    // Cargar las cabecera de los pagos
    const loadCabecera = async () => {
        const response = await fetch('https://fullstack-reactjs-nodejs.herokuapp.com/pagos')
        const data = await response.json()
        setCabecera(data)
        console.log(data)

    }

    // cargar tipo de pagos 
    const loadTPago = async () => {
        const response = await fetch('https://fullstack-reactjs-nodejs.herokuapp.com/tipoPago')
        const data = await response.json()
        setTPago(data)
        console.log(data)
    }

    // cargar fuentes de pagos by tipodeDatos
    const loadfpBYtP = async (id) => {
        const response = await fetch(`https://fullstack-reactjs-nodejs.herokuapp.com/fuentesPagoByTipo/${id}`)
        const data = await response.json()
        setFPago(data)

    }


    const handleSubmit = (event) => {

        event.preventDefault()

        const formData = {
            id_cabecera: numeroCompra((numero + 1)),
            descripcion_pago: pagos.descripcion_pago,
            ruc_proveedor: pagos.ruc_proveedor,
            cdgo_tipo_pago: pagos.cdgo_tipo_pago,
            fecha_pago: pagos.fecha_pago,
            total: totalPagos(inputarr),
            cab_estado: estado,
            detalles: inputarr
        };
        fetch('https://fullstack-reactjs-nodejs.herokuapp.com/pago', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
    };


    // cargar las facturas por proveedor seleccion



    // Guardarlos datos en un array de objetos desde el primero
    useEffect(() => {
        console.log('array2', inputarr)
    }, [inputarr])

    // Cargar los proveedores al cargar la pagina
    useEffect(() => {
        loadProv()


    }, [])

    useEffect(() => {
        loadCabecera()
    }, [])

     
    // Cargar las factura por el ruc o cecula de los proveedores
    useEffect(() => {
        if (pagos.ruc_proveedor) {
            loadFact(pagos.ruc_proveedor)
        }
    }, [pagos.ruc_proveedor])

    // Cargar las facturas por el id 
    useEffect(() => {
        if (detallesP.fcom_id) {
            loadFactbyId(detallesP.fcom_id)
        }
    }, [detallesP.fcom_id])

    useEffect(() => {
        loadTPago()
    }, [])


    //Cargar fuentes de datos by tipo de pago
    useEffect(() => {
        if (pagos.cdgo_tipo_pago) {
            loadfpBYtP(pagos.cdgo_tipo_pago)
        }
    }, [pagos.cdgo_tipo_pago])
    /*
    const styleNav = {
        //padding: '1em',
        border: '1em solid #2e518b',
        padding: '10px'
}
*/

    return (
        <Container >
            <h2>{numeroCompra((numero + 1))}</h2>
            <Form border="primary" noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>Descripción de Pago</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name='descripcion_pago'
                            value={pagos.descripcion_pago}
                            onChange={changeHandle}
                            placeholder="Descripción de Pago"
                        />
                        <Form.Control.Feedback type="invalid">
                            Llenar Campo.
                        </Form.Control.Feedback>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>Proveedor</Form.Label>
                        <Form.Select aria-label="Default select example"
                            required
                            name='ruc_proveedor'
                            value={pagos.ruc_proveedor}
                            onChange={(e) => changeHandle(e)}
                        >
                            <option value='null'>--Seleccione un Proveedor--</option>
                            {prov.filter(elemento => elemento.pro_credito_contado === true && elemento.pro_estado === true).map((elemento) => (
                                <option key={elemento.pro_cedula_ruc} value={elemento.pro_cedula_ruc}>{elemento.pro_nombre}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>Factura</Form.Label>
                        <Form.Select aria-label="Default select example" required name='fcom_id' value={detallesP.fcom_id}
                            onChange={(e) => handleChange(e)}
                        >
                            <option value='null'>--Seleccione Una Factura--</option>
                            {fact.map((elemento) => (
                                <option key={elemento.fcom_id} value={elemento.fcom_id} >{elemento.fcom_id}</option>

                            ))}
                        </Form.Select>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    {factid.map((elemento, ind) => (
                        <Card key={ind}>
                            <Card.Header as="h1"  >{elemento.fcom_id}</Card.Header>
                            <Card.Body>
                                <Container>
                                    <Row>
                                        <Form.Group as={Col} md="4" className="mb-3">
                                            <Form.Label>Cedula o RUC</Form.Label>
                                            <Form.Control placeholder={elemento.pro_cedula_ruc} disabled />
                                        </Form.Group>
                                        <Form.Group as={Col} md="4" className="mb-3">
                                            <Form.Label>Fecha de Compra</Form.Label>
                                            <Form.Control placeholder={elemento.fcom_fecha} disabled />
                                        </Form.Group>
                                        <Form.Group as={Col} md="4" className="mb-3">
                                            <Form.Label>Fecha de Vencimiento</Form.Label>
                                            <Form.Control placeholder={elemento.fcom_fechavencimiento} disabled />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <h2>Saldo: {elemento.fcom_total}</h2>
                                    </Row>
                                </Container>
                            </Card.Body>
                        </Card>

                    ))}
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="2" controlId="validationCustom03">
                        <Form.Label>Fecha de Pago</Form.Label>
                        <Form.Control type="date" placeholder="City" required
                            name='fecha_pago'
                            value={pagos.fecha_pago}
                            onChange={changeHandle}
                        />
                        <Form.Control.Feedback type="invalid">
                            Ponga un fecha.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>Tipo de Pago</Form.Label>

                        <Form.Select aria-label="Default select example"
                            required
                            type="text"
                            name='cdgo_tipo_pago'
                            value={pagos.cdgo_tipo_pago}
                            onChange={(e) => changeHandle(e)}
                        >
                            <option value='null'>--Seleccione Una Tipo de Pago--</option>
                            {tPago.map((elemento) => (
                                <option key={elemento.cdgo_tipo_pago} value={elemento.cdgo_tipo_pago} >{elemento.cdgo_tipo_pago}</option>

                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>Fuentes de Pago</Form.Label>

                        <Form.Select aria-label="Default select example"
                            required
                            type="text"
                        >
                            <option value='null'>--Seleccione Una Fuente de PAGO--</option>
                            {fPago.map((elemento) => (
                                <option key={elemento.id_fuentes_pago} value={elemento.id_fuentes_pago} >{elemento.fp_descripcion}</option>

                            ))}
                        </Form.Select>
                    </Form.Group>

                </Row>
                <Row>
                    <Form.Group as={Col} md="2" controlId="validationCustom01">
                        <Form.Label>Cantidad a Pagar</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            placeholder="Pago detalle"
                            name='cantidad_a_pagar'
                            value={detallesP.cantidad_a_pagar}
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            Llenar Campo.
                        </Form.Control.Feedback>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                </Row>
                <Row >
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Label>Estado</Form.Label>
                        <Form.Check type="checkbox" defaultChecked={true} onChange={checkHandle} label="Estado" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Button gap={3} className='guardar' onClick={handleChang} >Guardar</Button>
                        <NavLink  to='/historialdepagos' className='nav-item nav-link '  >Regresar</NavLink>
                    </Form.Group>
                </Row>
                <Row>
                    <Table striped  >

                        <thead>
                            <tr>
                                <th>Factura</th>
                                <th>Valor</th>
                                <th>Saldo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                inputarr.map((detall, ind) => (
                                    <tr key={ind}>
                                        <td>{detall.fcom_id}</td>
                                        <td>{detall.cantidad_a_pagar}</td>
                                        <td>{detall.saldo}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Row>

                <Row>
                    <Form.Group className="mb-3">
                        <Button type="submit"> Save</Button>
                    </Form.Group>
                </Row>
            </Form>
        </Container>
    )
}
