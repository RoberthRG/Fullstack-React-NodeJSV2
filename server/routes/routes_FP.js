const { Router } = require("express")
const { getAllFuentesPago, getAllTiposPago, postCreateFuente, putUpdateFuente, deleteFuente, getAllFuentesPagoByTipoPago, getListadoMovimientos
} = require('../controllers/fuentesPago_Controller')
const { getAllPago, getPago, deletePago, updatePago, createPagoDetalle, getFacturabyid, getPagos, getFacturas, getAllFacturasbyProveedor, getSumByFact, getReporte
} = require('../controllers/pagos.controller')


const router = Router();

router.get('/tipoPago', getAllTiposPago);
router.get('/menuFuentesPago', getAllFuentesPago);
router.get('/pago', getAllPago);
router.get('/pago/:id_cabecera', getPago)
router.get('/fuentesPagoByTipo/:cdgo_tipo_pago', getAllFuentesPagoByTipoPago)
router.get('/factura/:id', getFacturabyid)
router.get('/pagos', getPagos)
router.get('/facturas/:cedula_ruc', getAllFacturasbyProveedor)
router.get('/facturas/', getFacturas)
router.post('/agregarFuente', postCreateFuente);
router.post('/pago', createPagoDetalle)
router.put('/editarFuente', putUpdateFuente);
router.put('/eliminarFuente', deleteFuente);
router.put('/pago/:id_cabecera', deletePago);
router.put('/pago', updatePago);
router.get("/sumbyFact/:fcom_id", getSumByFact)
router.get("/listadofacturas", getListadoMovimientos);
router.get("/seguimiento", getReporte)

module.exports = router