import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Col,
  Table,
  Button,
  Form,
  Row,
  Modal,
  Container,
  Card,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

//Crear Pagos
function numeroCompra(numero) {
  let numeroC = ``;
  if (numero < 10) {
    numeroC = `PAG-PROV-0000${numero}`;
  } else if (numero >= 10 && numero < 100) {
    numeroC = `PAG-PROV-000${numero}`;
  } else if (numero >= 100 && numero < 1000) {
    numeroC = `PAG-PROV-00${numero}`;
  } else {
    numeroC = `PAG-PROV-0${numero}`;
  }
  return numeroC;
}

function restarSaldo(saldo, cantidad_a_pagar) {
  let saldoR = saldo - cantidad_a_pagar;
  return saldoR;
}

function totalSaldo(saldoOriginal, sumCP) {
  if (!isNaN(sumCP)) {
    return saldoOriginal - sumCP;

  } else {
    return saldoOriginal - 0;
  }
}

function totalPagos(inputarr) {
  let total = 0;
  for (let i = 0; i < inputarr.length; i++) {
    total = +inputarr[i].cantidad_a_pagar;
  }
  return total;
}

function HistorialdePagos() {
  //Crear Cuentas

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
  const [validated, setValidated] = useState(true);

  // capturar estado de true o false
  const [estado, setEstado] = useState("");

  const [tPago, setTPago] = useState([]);

  const [fPago, setFPago] = useState([]);

  //Lamma el numero de registros en la cabecera

  let numero = cabecera.length;
  //Llenar tabla de objetos

  const [inputarr, setInputarr] = useState([]);

  const [fsuma, setFSuma] = useState(0);

  let sum = fsuma.sumafact + 0;

  const [detallesP, setDetalles] = useState({
    cantidad_a_pagar: "",
    fcom_id: "",
    saldo: "",
  });

  //captrar evento
  const handleChange = (e) => {
    setDetalles({ ...detallesP, [e.target.name]: e.target.value });
  };

  let { cantidad_a_pagar, fcom_id } = detallesP;

  const handleChang = () => {
    console.log('s', detallesP.cantidad_a_pagar)
    console.log('a', totalSaldo(factid[0].fcom_total, fsuma.sumafact))
    if (detallesP.cantidad_a_pagar > totalSaldo(factid[0].fcom_total, fsuma.sumafact)) {
      alert(`La cantidad a pagar ${detallesP.cantidad_a_pagar} es mayor que el saldo ${totalSaldo(factid[0].fcom_total, fsuma.sumafact)}`)
    } else if (detallesP.cantidad_a_pagar < 0) {
      alert('Esta ingresando un valor negativo')
    } else {
      setInputarr([
        ...inputarr,
        {
          cantidad_a_pagar,
          fcom_id,
          saldo: (restarSaldo((totalSaldo(factid[0].fcom_total, fsuma.sumafact)).toFixed(2), detallesP.cantidad_a_pagar)).toFixed(2),
        },
      ]);

      console.log("array", detallesP);
      setDetalles({
        cantidad_a_pagar: "",
        fcom_id: "",
        saldo: (restarSaldo((totalSaldo(factid[0].fcom_total, fsuma.sumafact)).toFixed(2), detallesP.cantidad_a_pagar)).toFixed(2),
      });
    };
  }

  const [pagos, setPagos] = useState({
    descripcion_pago: "",
    ruc_proveedor: "",
    cdgo_tipo_pago: "",
    fecha_pago: "",
  });

  // capturas datos del formulario

  const changeHandle = (e) => {
    setPagos({ ...pagos, [e.target.name]: e.target.value });
  };

  // capturar estado del checked
  const checkHandle = (e) => {
    setEstado(
      e.target.checked
      //e.preventDefault(),

      //e.stopPropagation(),
    );

    console.log(estado);
  };

  ///Cargar Los proveedores

  const loadProv = async () => {
    const response = await fetch(
      "https://appdistribuidascompras.herokuapp.com/proveedor"
    ).catch((error) => {
      console.log(error);
    });
    const data = await response.json();
    setProv(data);
    console.log(data);
  };

  // Cargar las facturas por proveedor
  const loadFact = async (cedula_ruc) => {
    const response = await fetch(
      `https://appdistribuidascompras.herokuapp.com/fac_comprasPorProveedor/${cedula_ruc}`
    );
    const data = await response.json();
    setFact(data);
    console.log(data);
  };

  //Cargar las factiras por id de la factura
  const loadFactbyId = async (id) => {
    const response = await fetch(
      `https://appdistribuidascompras.herokuapp.com/fac_comprasId/${id}`
    );
    const data = await response.json();
    setFacturaId(data);
  };

  // Cargar las cabecera de los pagos
  const loadCabecera = async () => {
    const response = await fetch(
      "https://fullstack-reactjs-nodejs.herokuapp.com/pagos"
    );
    const data = await response.json();
    setCabecera(data);
    console.log(data);
  };

  // cargar tipo de pagos
  const loadTPago = async () => {
    const response = await fetch(
      "https://fullstack-reactjs-nodejs.herokuapp.com/tipoPago"
    );
    const data = await response.json();
    setTPago(data);
    console.log(data);
  };

  // cargar fuentes de pagos by tipodeDatos
  const loadfpBYtP = async (id) => {
    const response = await fetch(
      `https://fullstack-reactjs-nodejs.herokuapp.com/fuentesPagoByTipo/${id}`
    );
    const data = await response.json();
    setFPago(data);
  };

  //Suma de Factubra By Fac

  const loadSumFactBYFac = async (fcom_id) => {
    const response = await fetch(
      `https://fullstack-reactjs-nodejs.herokuapp.com/sumbyFact/${fcom_id}`
    );
    const data = await response.json();
    setFSuma(data)
    console.log('suma', data)
  };

  const peticionPost = async () => {
    const formData = {
      id_cabecera: numeroCompra(numero + 1),
      descripcion_pago: pagos.descripcion_pago,
      ruc_proveedor: pagos.ruc_proveedor,
      cdgo_tipo_pago: pagos.cdgo_tipo_pago,
      fecha_pago: pagos.fecha_pago,
      total: totalPagos(inputarr).toFixed(2),
      cab_estado: true,
      detalles: inputarr,
    };
    await fetch("https://fullstack-reactjs-nodejs.herokuapp.com/pago", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    getData();
    //alert('Probando')
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      event.preventDefault();
      event.stopPropagation();
      //handleClose();
      setValidated(false);

    } else {
      event.preventDefault();
      event.stopPropagation();
      //handleClose();
      setValidated(true);
      peticionPost();
    }
    setValidated(true)
  };

  const peticionPut = async () => {
    const formData = {
      id_cabecera: pagoSeleccionado.id_cabecera,
      descripcion_pago: pagos.descripcion_pago,
      ruc_proveedor: pagos.ruc_proveedor,
      cdgo_tipo_pago: pagos.cdgo_tipo_pago,
      fecha_pago: pagos.fecha_pago,
      total: totalPagos(inputarr).toFixed(2),
      cab_estado: estado,
      detalles: inputarr,
    };
    await fetch("https://fullstack-reactjs-nodejs.herokuapp.com/pago", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).catch((error) => {
      console.log(error.message);
    });
    getData();
  };

  const handleSubmitPut = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      event.preventDefault();
      event.stopPropagation();
      //handleClose();
      setValidated(false);
    } else {
      event.preventDefault();
      event.stopPropagation();
      handleCloseEditar();
      setValidated(true);
    }
    peticionPut();
  };

  // cargar las facturas por proveedor seleccion

  // Guardarlos datos en un array de objetos desde el primero
  useEffect(() => {
    console.log("array2", inputarr);
  }, [inputarr]);

  // Cargar los proveedores al cargar la pagina
  useEffect(() => {
    loadProv();
  }, []);

  useEffect(() => {
    loadCabecera();
  }, []);

  // Cargar las factura por el ruc o cecula de los proveedores
  useEffect(() => {
    if (pagos.ruc_proveedor) {
      loadFact(pagos.ruc_proveedor);
    }
  }, [pagos.ruc_proveedor]);

  // Cargar las facturas por el id
  useEffect(() => {
    if (detallesP.fcom_id) {
      loadFactbyId(detallesP.fcom_id);
    }
  }, [detallesP.fcom_id]);

  useEffect(() => {
    loadTPago();
  }, []);

  //Cargar fuentes de datos by tipo de pago
  useEffect(() => {
    if (pagos.cdgo_tipo_pago) {
      loadfpBYtP(pagos.cdgo_tipo_pago);
    }
  }, [pagos.cdgo_tipo_pago]);

  //Suma de las factura por el id de la factura
  useEffect(() => {
    if (detallesP.fcom_id) {
      loadSumFactBYFac(detallesP.fcom_id);
    }
  }, [detallesP.fcom_id]);

  //Seleccionar Datos
  const url = "https://fullstack-reactjs-nodejs.herokuapp.com/pago";
  const [data, setData] = useState([]);

  const [pagoSeleccionado, setPagoSeleccionado] = useState({
    id_cabecera: "",
    cab_estado: "",
    descripcion_pago: "",
    ruc_proveedor: "",
    cdgo_tipo_pago: "",
    fecha_pago: "",
    cab_detalle: [],
    total: "",
  });

  const peticionGetOnePago = (pago) => {
    setPagoSeleccionado({
      id_cabecera: pago.id_cabecera,
      cab_estado: pago.cab_estado,
      descripcion_pago: pago.descripcion_pago,
      ruc_proveedor: pago.ruc_proveedor,
      cdgo_tipo_pago: pago.cdgo_tipo_pago,
      fecha_pago: pago.fecha_pago,
      cab_detalle: pago.cab_detalle,
      total: pago.total,
    });
    setEstado(pago.cab_estado);
  };

  const ObtenerDetalles = () => {
    setInputarr(pagoSeleccionado.cab_detalle);
  };

  const vaciarCampos = () => {
    setInputarr([]);
    setFact([]);
    setPagos({
      descripcion_pago: "",
      ruc_proveedor: "",
      cdgo_tipo_pago: "",
      fecha_pago: "",
    });
  };

  const sobreescribirPago = () => {
    //Formato de fecha
    var date = (pagoSeleccionado.fecha_pago = new Date());
    var year = date.toLocaleString("default", { year: "numeric" });
    var month = date.toLocaleString("default", { month: "2-digit" });
    var day = date.toLocaleString("default", { day: "2-digit" });
    // Fecha formato yyyy-mm-dd
    var formattedDate = year + "-" + month + "-" + day;

    setPagos({
      descripcion_pago: pagoSeleccionado.descripcion_pago,
      ruc_proveedor: pagoSeleccionado.ruc_proveedor,
      cdgo_tipo_pago: pagoSeleccionado.cdgo_tipo_pago,
      fecha_pago: formattedDate,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios.get(url).then((response) => {
      setData(response.data);
      console.log(response.data);
      //handleCloseEditar();
      //handleClose();
    });
  };

  //Datos de Modal Crear
  const [show, setShow] = useState(false);

  //Cerrar Modal Crear
  const handleClose = () => setShow(false);

  //Abrir Modal Crear
  const handleShow = () => {
    setShow(true);
    vaciarCampos();
  };

  //Datos de Modal Editar
  const [meditar, setMeditar] = useState(false);

  //Cerrar Modal Editar
  const handleCloseEditar = () => setMeditar(false);

  //Abrir Modal Editar
  const handleShowEditar = () => setMeditar(true);

  return (
    <div>
      <br />
      <br />
      <br />
      <Form.Group as={Row} controlId="formHorizontalPassword">
        <Col sm={1}>
          <Button size="lg" onClick={handleShow}>
            Crear
          </Button>
        </Col>
        <Col sm={5}></Col>
        <Col sm={1}>
          <h1>Historial de Pagos</h1>
        </Col>
        <Col></Col>
      </Form.Group>

      <br />
      <br />

      <Table striped bordered hover className="text-center">
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
          {data.map((pago) => (
            <tr key={pago.id_cabecera}>
              <td>
                <Button
                  variant="danger"
                  size="lg"
                  onClick={() => {
                    peticionGetOnePago(pago);
                    handleShowEditar();
                  }}
                >
                  <i className="fa-solid fa-pen"></i>
                </Button>
              </td>
              <td>{pago.id_cabecera}</td>
              <td>
                <div className="text-center text-top">
                  <Form.Check
                    readOnly
                    checked={pago.cab_estado}
                    type="switch"
                    id="custom-switch"
                  ></Form.Check>
                </div>
              </td>
              <td>{pago.descripcion_pago}</td>
              <td>{pago.ruc_proveedor}</td>
              <td>{pago.cdgo_tipo_pago}</td>
              <td>{new Date(pago.fecha_pago).toLocaleDateString()}</td>
              <td>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>ID Pago Factura</th>
                      <th>Cantidad a Pagar</th>
                      <th>Codigo de Factura</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pago.cab_detalle.map((detalle) => (
                      <tr key={detalle.id_detalle}>
                        <td>{detalle.id_detalle}</td>
                        <td>{detalle.cantidad_a_pagar}</td>
                        <td>{detalle.fcom_id}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </td>
              <td>{pago.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal CREAR */}
      <Modal show={show} onHide={handleClose} size={"xl"}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Historial de Pago</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <h2>{numeroCompra(numero + 1)}</h2>
            <Form
              border="primary"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                  <Form.Label>Descripción de Pago</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="descripcion_pago"
                    value={pagos.descripcion_pago}
                    onChange={changeHandle}
                    placeholder="Descripción de Pago"
                  />
                  <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Ingrese una Descripción por favor.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                  <Form.Label>Proveedor</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    required
                    name="ruc_proveedor"
                    value={pagos.ruc_proveedor}
                    onChange={(e) => changeHandle(e)}
                  >
                    <option value="null">--Seleccione un Proveedor--</option>
                    {prov
                      .filter(
                        (elemento) =>
                          elemento.pro_credito_contado === true &&
                          elemento.pro_estado === true
                      )
                      .map((elemento) => (
                        <option
                          key={elemento.pro_cedula_ruc}
                          value={elemento.pro_cedula_ruc}
                        >
                          {elemento.pro_nombre}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                  <Form.Label>Factura</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    required
                    name="fcom_id"
                    value={detallesP.fcom_id}
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="null">--Seleccione Una Factura--</option>
                    {fact.map((elemento) => (
                      <option key={elemento.fcom_id} value={elemento.fcom_id}>
                        {elemento.fcom_id}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                {factid.map((elemento, ind) => (
                  <Card key={ind}>
                    <Card.Header as="h1">{elemento.fcom_id}</Card.Header>
                    <Card.Body>
                      <Container>
                        <Row>
                          <Form.Group as={Col} md="4" className="mb-3">
                            <Form.Label>Cedula o RUC</Form.Label>
                            <Form.Control
                              placeholder={elemento.pro_cedula_ruc}
                              disabled
                            />
                          </Form.Group>
                          <Form.Group as={Col} md="4" className="mb-3">
                            <Form.Label>Fecha de Compra</Form.Label>
                            <Form.Control
                              placeholder={new Date(
                                elemento.fcom_fecha
                              ).toLocaleDateString()}
                              disabled
                            />
                          </Form.Group>
                          <Form.Group as={Col} md="4" className="mb-3">
                            <Form.Label>Fecha de Vencimiento</Form.Label>
                            <Form.Control
                              placeholder={new Date(
                                elemento.fcom_fechavencimiento
                              ).toLocaleDateString()}
                              disabled
                            />
                          </Form.Group>
                        </Row>
                        <Row>
                          <h3>Saldo Total: {elemento.fcom_total}</h3>
                          <h2>Saldo Restantes: {(totalSaldo(elemento.fcom_total, sum)).toFixed(2)}</h2>
                        </Row>
                        <Form.Group
                          as={Col}
                          md="2"
                          controlId="validationCustom01"
                        >
                          <Form.Label>Cantidad a Pagar</Form.Label>
                          <Form.Control
                            required
                            type="number"
                            placeholder="Pago detalle"
                            name="cantidad_a_pagar"
                            value={detallesP.cantidad_a_pagar}
                            onChange={handleChange}
                            min="0"
                            max={elemento.fcom_total}
                          />
                          <Form.Control.Feedback type="invalid">
                            Llenar Campo.
                          </Form.Control.Feedback>
                          <Form.Control.Feedback>
                            Looks good!
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Button
                            gap={3}
                            className="guardar"
                            onClick={handleChang}
                          >
                            Agregar
                          </Button>
                        </Form.Group>
                      </Container>
                    </Card.Body>
                  </Card>
                ))}
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="2" controlId="validationCustom03">
                  <Form.Label>Fecha de Pago</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="City"
                    required
                    name="fecha_pago"
                    value={pagos.fecha_pago}
                    onChange={changeHandle}
                  />
                  <Form.Control.Feedback type="invalid">
                    Ponga un fecha.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                  <Form.Label>Tipo de Pago</Form.Label>

                  <Form.Select
                    aria-label="Default select example"
                    required
                    type="text"
                    name="cdgo_tipo_pago"
                    value={pagos.cdgo_tipo_pago}
                    onChange={(e) => changeHandle(e)}
                  >
                    <option value="null">
                      --Seleccione Una Tipo de Pago--
                    </option>
                    {tPago.map((elemento) => (
                      <option
                        key={elemento.cdgo_tipo_pago}
                        value={elemento.cdgo_tipo_pago}
                      >
                        {elemento.cdgo_tipo_pago}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                  <Form.Label>Fuentes de Pago</Form.Label>

                  <Form.Select
                    aria-label="Default select example"
                    required
                    type="text"
                  >
                    <option value="null">
                      --Seleccione Una Fuente de PAGO--
                    </option>
                    {fPago.map((elemento) => (
                      <option
                        key={elemento.id_fuentes_pago}
                        value={elemento.id_fuentes_pago}
                      >
                        {elemento.fp_descripcion}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Label>Estado</Form.Label>
                  <Form.Check type="checkbox" readOnly checked label="Estado" />
                </Form.Group>
              </Row>
              <Row>
                <Table striped>
                  <thead>
                    <tr>
                      <th>Factura</th>
                      <th>Valor</th>
                      <th>Saldo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inputarr.map((detall, ind) => (
                      <tr key={ind}>
                        <td>{detall.fcom_id}</td>
                        <td>{detall.cantidad_a_pagar}</td>
                        <td>{detall.saldo}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Row>

              <Row>
                <Form.Group className="mb-3">
                  <Button type="submit"> Guardar</Button>
                </Form.Group>
              </Row>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>

      {/*Modal EDITAR*/}
      <Modal
        show={meditar}
        onHide={handleCloseEditar}
        size={"xl"}
        onShow={() => {
          sobreescribirPago();
          ObtenerDetalles();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar Historial de Pago</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <h2>{pagoSeleccionado.id_cabecera}</h2>
            <Form
              border="primary"
              noValidate
              validated={validated}
              onSubmit={handleSubmitPut}
            >
              <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                  <Form.Label>Descripción de Pago</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="descripcion_pago"
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
                  <Form.Select
                    aria-label="Default select example"
                    required
                    name="ruc_proveedor"
                    value={pagos.ruc_proveedor}
                    onChange={(e) => changeHandle(e)}
                  >
                    <option value="null">--Seleccione un Proveedor--</option>
                    {prov
                      .filter(
                        (elemento) =>
                          elemento.pro_credito_contado === true &&
                          elemento.pro_estado === true
                      )
                      .map((elemento) => (
                        <option
                          key={elemento.pro_cedula_ruc}
                          value={elemento.pro_cedula_ruc}
                        >
                          {elemento.pro_nombre}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                  <Form.Label>Factura</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    required
                    name="fcom_id"
                    value={detallesP.fcom_id}
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="null">--Seleccione Una Factura--</option>
                    {fact.map((elemento) => (
                      <option key={elemento.fcom_id} value={elemento.fcom_id}>
                        {elemento.fcom_id}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                {factid.map((elemento, ind) => (
                  <Card key={ind}>
                    <Card.Header as="h1">{elemento.fcom_id}</Card.Header>
                    <Card.Body>
                      <Container>
                        <Row>
                          <Form.Group as={Col} md="4" className="mb-3">
                            <Form.Label>Cedula o RUC</Form.Label>
                            <Form.Control
                              placeholder={elemento.pro_cedula_ruc}
                              disabled
                            />
                          </Form.Group>
                          <Form.Group as={Col} md="4" className="mb-3">
                            <Form.Label>Fecha de Compra</Form.Label>
                            <Form.Control
                              placeholder={new Date(
                                elemento.fcom_fecha
                              ).toLocaleDateString()}
                              disabled
                            />
                          </Form.Group>
                          <Form.Group as={Col} md="4" className="mb-3">
                            <Form.Label>Fecha de Vencimiento</Form.Label>
                            <Form.Control
                              placeholder={new Date(
                                elemento.fcom_fechavencimiento
                              ).toLocaleDateString()}
                              disabled
                            />
                          </Form.Group>
                        </Row>
                        <Row>
                          <h2>Saldo: {elemento.fcom_total}</h2>
                        </Row>
                        <Form.Group
                          as={Col}
                          md="2"
                          controlId="validationCustom01"
                        >
                          <Form.Label>Cantidad a Pagar</Form.Label>
                          {factid.map((elemento) => (
                            <Form.Control
                              required
                              type="number"
                              placeholder="Pago detalle"
                              name="cantidad_a_pagar"
                              value={detallesP.cantidad_a_pagar}
                              onChange={handleChange}
                              min="0"
                              max={elemento.fcom_total}
                            />
                          ))}
                          <Form.Control.Feedback type="invalid">
                            Llenar Campo.
                          </Form.Control.Feedback>
                          <Form.Control.Feedback>
                            Looks good!
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Button
                            gap={3}
                            className="guardar"
                            onClick={handleChang}
                          >
                            Agregar
                          </Button>
                        </Form.Group>
                      </Container>
                    </Card.Body>
                  </Card>
                ))}
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="2" controlId="validationCustom03">
                  <Form.Label>Fecha de Pago</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="City"
                    required
                    name="fecha_pago"
                    value={pagos.fecha_pago}
                    onChange={changeHandle}
                  />
                  <Form.Control.Feedback type="invalid">
                    Ponga un fecha.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                  <Form.Label>Tipo de Pago</Form.Label>

                  <Form.Select
                    aria-label="Default select example"
                    required
                    type="text"
                    name="cdgo_tipo_pago"
                    value={pagos.cdgo_tipo_pago}
                    onChange={(e) => changeHandle(e)}
                  >
                    <option value="null">
                      --Seleccione Una Tipo de Pago--
                    </option>
                    {tPago.map((elemento) => (
                      <option
                        key={elemento.cdgo_tipo_pago}
                        value={elemento.cdgo_tipo_pago}
                      >
                        {elemento.cdgo_tipo_pago}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                  <Form.Label>Fuentes de Pago</Form.Label>

                  <Form.Select
                    aria-label="Default select example"
                    required
                    type="text"
                  >
                    <option value="null">
                      --Seleccione Una Fuente de PAGO--
                    </option>
                    {fPago.map((elemento) => (
                      <option
                        key={elemento.id_fuentes_pago}
                        value={elemento.id_fuentes_pago}
                      >
                        {elemento.fp_descripcion}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Label>Estado</Form.Label>
                  <Form.Check
                    type="checkbox"
                    onChange={checkHandle}
                    label="Estado"
                    defaultChecked={pagoSeleccionado.cab_estado}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Table striped>
                  <thead>
                    <tr>
                      <th>Factura</th>
                      <th>Valor</th>
                      <th>Saldo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inputarr.map((detall, ind) => (
                      <tr key={ind}>
                        <td>{detall.fcom_id}</td>
                        <td>{detall.cantidad_a_pagar}</td>
                        <td>{detall.saldo}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Row>

              <Row>
                <Form.Group className="mb-3">
                  <Button type="submit"> Guardar</Button>
                </Form.Group>
              </Row>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
}
export default HistorialdePagos;
