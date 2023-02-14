//import "bootstrap/dist/css/bootstrap.min.css";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function BasicExample() {
    return (
        <div className="App">
            <h1>Detalle del pago</h1>
            <h5>Facturas</h5>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Accion</th>
                        <th>Cedula/RUC</th>
                        <th>Tipo de proveedor</th>
                        <th>Nombre</th>
                        <th>Factura</th>
                        <th>Tipo de Pago</th>
                        <th>Fecha de vencimiento</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Button variant="outline-secondary">+</Button>{' '}
                        </td>
                        <td>1005110737</td>
                        <td>Comercial</td>
                        <td>Orlandos Resort</td>
                        <td>Fac01</td>
                        <td>Credito</td>
                        <td>18/11/2022</td>
                        <td>325$</td>
                    </tr>
                    <tr>
                        <td>
                            <Button variant="outline-secondary">+</Button>{' '}
                        </td>
                        <td>1006221789</td>
                        <td>Comercial</td>
                        <td>Marianitas</td>
                        <td>Fac06</td>
                        <td>Credito</td>
                        <td>25/11/2022</td>
                        <td>500$</td>
                    </tr>
                </tbody>
            </Table>

            <h5>Detalles</h5>
            <Button as="vaciar" type="button">Vaciar</Button>{' '}
            <table className='table table-bordered'>

                <thead>
                    <tr>
                        <th>Accion</th>
                        <th>Cedula/RUC</th>
                        <th>Tipo de proveedor</th>
                        <th>Nombre</th>
                        <th>Factura</th>
                        <th>Tipo de Pago</th>
                        <th>Fecha de vencimiento</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Form.Control size="sm" type="text" placeholder="Valor a Pagar" />
                            <button type="button" class="btn btn-primary">Pagar</button>
                        </td>
                        <td>1005110737</td>
                        <td>Comercial</td>
                        <td>Orlandos Resort</td>
                        <td>Fac01</td>
                        <td>Credito</td>
                        <td>18/11/2022</td>
                        <td>325$</td>
                    </tr>
                </tbody>
            </table>
            <Button variant="success">Confirmar</Button>{' '}
            <Button variant="danger">Cancelar</Button>{' '}
        </div>
    );
}
export default BasicExample;