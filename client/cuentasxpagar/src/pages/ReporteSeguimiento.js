import "../App.css";
import "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import { Container, FormControl, Table } from "react-bootstrap";
import { InputGroup, InputGroupText } from "reactstrap";
import { BlobProvider, PDFViewer } from "@react-pdf/renderer";
import DocumentoPDF from "../components/DocumentoPDF";
import ViewProvider from "../components/ViewProvider";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ReporteSeguimiento = () => {
  //1 - Configurar los hooks
  const [datosFacturas, setDatosFacturas] = useState([]);
  const [datosProvedor, setDatosProveedor] = useState({});
  const [proveedores, SetProvedores] = useState([]);
  const [idproveedor, setIdproveedor] = useState("");
  const [generar, setGenerar] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  //2 - Función para mostrar los datos con fetch
  const URL = "https://fullstack-reactjs-nodejs.herokuapp.com/seguimiento";
  const showData = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    //console.log(data);
    setDatosFacturas(data);
  };

  useEffect(() => {
    showData();
  }, []);

  //2.1 - Función para mostrar los datos con fetch en el select
  const API = "https://appdistribuidascompras.herokuapp.com/proveedor";
  const showDataSelect = async () => {
    const responseAPI = await fetch(API);
    const dataProveedores = await responseAPI.json();
    //console.log(dataProveedores);
    SetProvedores(dataProveedores);
  };

  useEffect(() => {
    if (proveedores && idproveedor) {
      //console.log(idproveedor);
      const dataProveedor = proveedores.find(
        (e) => e.pro_cedula_ruc === idproveedor
      );
      setDatosProveedor(dataProveedor);
    }
  }, [idproveedor, datosProvedor, proveedores]);

  useEffect(() => {
    showDataSelect();
  }, []);

  //3. Configuramos los datos a obtener
  //5. Funcion de confirmacion para Sweet Alert 2
  const confirmReporte = () => {
    Swal.fire({
      title: "¿Seguro quiere generar este reporte?",
      text: "Se generará un PDF con los datos seleccionados!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Generar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        //deleteCareer(id)
        setGenerar(true);

        /*Swal.fire(
                    'Se ha generado un PDF!',
                    'Revisar la parte inferior de la página.'
                )
                */
      }
    });
  };

  //3.1 - Configuramos las columns para Datatable
  const columns = [
    {
      name: "FECHA DE PAGO",
      selector: (row) => row.fecha_pago,
    },
    {
      name: "DNI",
      selector: (row) => row.ruc_proveedor,
    },
    {
      name: "TIPO DE PAGO",
      selector: (row) => row.cdgo_tipo_pago,
    },
    {
      name: "CABECERA",
      selector: (row) => row.id_cabecera,
    },
    {
      name: "CODIGO DE FACTURA",
      selector: (row) => row.fcom_id,
    },
    {
      name: "DEBE",
      selector: (row) => row.Debe,
    },
    {
      name: "PAGO",
      selector: (row) => row.Pago,
    },
  ];

  const handleIdproveedor = (event) => {
    //console.log(event.target.value);
    setIdproveedor(event.target.value);
  };

  const handleCargarProveedor = function (e) {
    const opcion = e.target.value;
    //console.log(opcion);

    setIdproveedor(opcion);
  };

  const estiloTitulo = {
    color: "blue",
    fontSize: "2em",
    textAlign: "center",
    fontWeight: "bold",
  };

  //4 - Mostramos la data en DataTable
  return (
    <Container>
      <div className="App">
        <h1 style={estiloTitulo}>REPORTE DE SEGUIMIENTO</h1>
        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalPassword"
        >
          <Col sm={6}>
            <InputGroup className="mb-3">
              <InputGroupText id="buscar">SELECCIONE PROVEEDOR:</InputGroupText>
              {proveedores && proveedores.length > 0 ? (
                <Form.Select
                  aria-label="Default select example"
                  required
                  //name="ruc_proveedor"
                  onChange={handleCargarProveedor}
                >
                  <option value={-1}>--- Selecione un Proveedor ---</option>
                  {proveedores.map((item, index) => (
                    <option key={index} value={item.pro_cedula_ruc}>
                      {" "}
                      {item.pro_nombre}{" "}
                    </option>
                  ))}
                </Form.Select>
              ) : (
                <>Cargando Proveedores...</>
              )}
            </InputGroup>
          </Col>
        </Form.Group>
        <Button onClick={() => confirmReporte()}>Generar Reporte</Button>

        <br />
        {generar &&
          datosFacturas &&
          datosProvedor.hasOwnProperty("pro_cedula_ruc") ? (
          <BlobProvider
            document={
              <DocumentoPDF
                facturas={datosFacturas}
                datos={datosProvedor}
                idproveedor={idproveedor}
              />
            }
          >
            {({ url }) => (
              <a href={url} target="_blank" rel="noreferrer">
                DESCARGAR PDF
              </a>
            )}
          </BlobProvider>
        ) : null}
        <br />

        <div>
          <a> DATOS OBTENIDOS DEL PROVEEDOR</a>
        </div>

        {datosProvedor.hasOwnProperty("pro_cedula_ruc") && (
          <ViewProvider data={datosProvedor} />
        )}

        <br />
        <Table striped bordered hover>
          <thead>
            <tr>
              {columns.map((columna, index) => (
                <th key={index}>{columna.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {datosFacturas.map(
              (factura, index) =>
                factura.ruc_proveedor === idproveedor && (
                  <tr key={index}>
                    <td>
                      {new Date(factura.fecha_pago).toLocaleDateString()}
                    </td>
                    <td>{factura.ruc_proveedor}</td>
                    <td>{factura.cdgo_tipo_pago}</td>
                    <td>{factura.id_cabecera}</td>
                    <td>{factura.fcom_id}</td>
                    <td>{(factura.debe).toFixed(2)}</td>
                    <td>{factura.pago}</td>
                  </tr>
                )
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default ReporteSeguimiento;