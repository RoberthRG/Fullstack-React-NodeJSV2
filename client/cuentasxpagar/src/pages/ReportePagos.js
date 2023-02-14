import "../App.css";
import "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { InputGroup, InputGroupText } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//import DatePicker from "react-datepicker/dist/react-datepicker-cssmodules.css";

import Swal from "sweetalert2";

const ReporteSeguimiento = () => {
  //1 - Configurar los hooks
  const [datosFacturas, setDatosFacturas] = useState([]);
  const [arrayCheck, setArrayCheck] = useState(null);
  const [datosProvedor, setDatosProveedor] = useState({});
  const [proveedores, SetProvedores] = useState([]);
  const [idproveedor, setIdproveedor] = useState("");
  const [generar, setGenerar] = useState(false);
  const [seleccionados, setSeleccionados] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  //2 - Función para mostrar los datos con fetch
  const URL = "https://fullstack-reactjs-nodejs.herokuapp.com/listadofacturas";
  const showData = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    setDatosFacturas(data);
    setArrayCheck(new Array(data.length).fill(false));
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

  //Funcion para Exportar en Excel
  const handleOnExport = () => {
    //console.log(arrayCheck, datosFacturas)

    const facturasSeleccionadas = arrayCheck
      .map((isSelected, index) => {
        if (isSelected) {
          return datosFacturas[index];
        }
      })
      .filter((datosFacturas) => datosFacturas);

    //console.log(facturasSeleccionadas)

    let XLSX = require("xlsx");

    const datosExcel = facturasSeleccionadas.map(
      (factura, index) =>
        factura.ruc_proveedor === idproveedor && {
          cedula_prov: factura.ruc_proveedor,
          nombre_apellidos: datosProvedor.pro_nombre,
          codigo_pago: factura.id_cabecera,
          fecha_pago: new Date(factura.fecha_pago).toLocaleDateString(),
          forma_pago: factura.cdgo_tipo_pago,
          factura: factura.fcom_id,
          saldo: factura.saldo <= 0 ? "Factura Pagada" : factura.saldo,
        }
    );

    let wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(datosExcel);

    XLSX.utils.book_append_sheet(wb, ws, "Libro1");

    XLSX.writeFile(wb, `Reporte.xlsx`);
  };

  //3. Configuramos los datos a obtener
  //5. Funcion de confirmacion para Sweet Alert 2
  const confirmReporte = () => {
    Swal.fire({
      title: "¿Seguro quiere generar este reporte?",
      text: "Se generará un Excel con los datos seleccionados!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Generar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setGenerar(true);
        handleOnExport();
      }
    });
  };

  //3.1 - Configuramos las columns para Datatable
  const columns = [
    {
      name: "CHECK",
    },
    {
      name: "PROVEEDOR",
      selector: (row) => row.ruc_proveedor,
    },
    {
      name: "NOMBRE PROVEEDOR",
      selector: (row) => row.pro_nombre,
    },
    {
      name: "CODIGO PAGO",
      selector: (row) => row.id_cabecera,
    },
    {
      name: "FECHA DE PAGO",
      selector: (row) => row.fecha_pago,
    },
    {
      name: "TIPO DE PAGO",
      selector: (row) => row.cdgo_tipo_pago,
    },
    {
      name: "FACTURA",
      selector: (row) => row.fcom_id,
    },

    {
      name: "SALDO",
      selector: (row) => row.saldo,
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

  const handleSleccionar = (index) => {
    setArrayCheck((prevArrayCheck) => {
      const newArrayCheck = [...prevArrayCheck];
      newArrayCheck[index] = !newArrayCheck[index];
      return newArrayCheck;
    });
  };

  // Fechas inicio
  const handleStartDateChange = (date) => {
    //console.log(date)
    setStartDate(date);
  };

  console.log(startDate, endDate, new Date("2023-02-13T00:00:00.000Z"));

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleSearch = () => {
    // Aquí puedes realizar la búsqueda con las fechas seleccionadas
    console.log("Búsqueda por fecha:", startDate, endDate);
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
        <h1 style={estiloTitulo}>HISTORIAL DE PAGOS</h1>
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
          <Col sm={4}>
            <InputGroup className="mb-3">
              <h1>Fecha inicial</h1>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                placeholderText="Fecha Inicial"
              />
              <h1>Fecha final</h1>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                placeholderText="Fecha Final"
              />
            </InputGroup>
          </Col>
        </Form.Group>
        {/*   Fecha Inicial
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        Fecha Final
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} /> */}
        <Button onClick={() => confirmReporte()}>EXPORTAR</Button>
        <br />
        <div>
          <h2> LISTADO DE PAGOS </h2>
        </div>
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
                factura.ruc_proveedor === idproveedor &&
                (startDate === null ||
                  new Date(factura.fecha_pago) >= startDate) &&
                (endDate === null ||
                  new Date(factura.fecha_pago) <= endDate) && (
                  <tr key={index}>
                    <td>
                      <input
                        type="checkbox"
                        id={index}
                        checked={arrayCheck[index]}
                        onChange={() => handleSleccionar(index)}
                      />
                    </td>
                    <td>{factura.ruc_proveedor}</td>
                    <td>{datosProvedor.pro_nombre}</td>
                    <td>{factura.id_cabecera}</td>
                    <td>{new Date(factura.fecha_pago).toLocaleDateString()}</td>
                    <td>{factura.cdgo_tipo_pago}</td>
                    <td>{factura.fcom_id}</td>
                    <td>
                      {factura.saldo <= 0 ? "Factura Pagada" : factura.saldo}
                    </td>
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