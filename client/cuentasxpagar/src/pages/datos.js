import "bootstrap/dist/css/bootstrap.min.css";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
export { cabeceras, renderCabecera }

const detalles = [
    { idDetalles: "1", codigoFactura: "Fac01", cantidadPagar: "200$" },
    { idDetalles: "2", codigoFactura: "Fac02", cantidadPagar: "125$" }
]
const renderDetalle = (detalle, index) => {
    return (
        <tr key={index}>
            <td>{detalle.idDetalles}</td>
            <td>{detalle.codigoFactura}</td>
            <td>{detalle.cantidadPagar}</td>
        </tr>
    )
}
const cabeceras = [
    { numeroPagos: "PAG-PROV-00001", descripciónPagos: "Comercial", rucProveedor: "1005110737", tipoPago: "Efectivo", fechaPago: "27/12/2022", totalaPagar: "500$", totalPagado: "325$" }
]
const renderCabecera = (cabecera, index) => {
    return (
        <tr key={index}>
            <td>
                <Button as="editar" type="button" variant="success">Editar</Button>{' '}
                <h1>

                </h1>
                <Button as="borrar" type="button" variant="danger">Borrar</Button>{' '}
            </td>
            <td>{cabecera.numeroPagos}</td>
            <td>{cabecera.descripciónPagos}</td>
            <td>{cabecera.rucProveedor}</td>
            <td>{cabecera.tipoPago}</td>
            <td>{cabecera.fechaPago}</td>
            <td>{cabecera.totalaPagar}</td>
            <td>{cabecera.totalPagado}</td>
            <td>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id Detalle</th>
                            <th>Codigo Factura</th>
                            <th>Cantidad Pagar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {detalles.map(renderDetalle)}
                    </tbody>
                </Table>
            </td>
        </tr>
    )
}