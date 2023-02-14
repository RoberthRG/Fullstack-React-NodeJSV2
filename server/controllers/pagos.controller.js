const { response } = require('express');
//const { db } = require('../configure/connection')
const { db } = require('../configure/conecction');

const getPagos = async (req, res) => {
    try {
        const cabecera = await db.any(`SELECT * FROM public.cp_cabecera;`)
        res.json(cabecera)
    } catch (error) {
        console.log(error)
        res.json({
            message: 'Valores incorrectos'
        })
    }
}

//suma
const getSumByFact = async (req, res) => {
    try {
        const { fcom_id } = req.params
        const response = await db.one(`SELECT SUM(cd.cantidad_a_pagar) as sumaFact
        FROM cp_detalle as cd 
        INNER JOIN cp_cabecera as ca ON ca.id_cabecera = cd.id_cabecera 
        WHERE cd.fcom_id = $1
        GROUP BY cd.fcom_id;`,
            [fcom_id])
        console.log(response)
        if (response !== undefined) {
            res.json(response)
        } else {
            res.json(0)
        }
    } catch (error) {
        console.log(error.message);
        res.json(0);
    }
}

const getReporte = async (req, res) => {
    try {
        const response = await db.any(`SELECT cc.fecha_pago,cc.ruc_proveedor, cc.cdgo_tipo_pago, cc.id_cabecera, cd.fcom_id, cd.saldo as Debe, cd.cantidad_a_pagar as Pago
        FROM cp_cabecera AS cc 
        INNER JOIN cp_detalle AS cd ON cd.id_cabecera = cc.id_cabecera
        GROUP BY cc.id_cabecera, cd.fcom_id, cd.saldo, cd.cantidad_a_pagar 
        ORDER BY cc.ruc_proveedor, cd.saldo DESC;`)
        res.json(response)
    } catch (error) {
        console.log(error.message)
        res.json({ message: error.message })
      }
  }

const getAllPago = async (req, res) => {

    try {
        const cabecera = await db.any(`SELECT*FROM public.cp_cabecera order by id_cabecera;`);
        let response = [];
        for (let i = 0; i < cabecera.length; i++) {
            let detallePago = await db.any(`SELECT det.* from cp_cabecera cab, cp_detalle det where cab.id_cabecera = det.id_cabecera and
             det.id_cabecera = $1;`, [cabecera[i].id_cabecera]);
            cabecera[i].cab_detalle = detallePago
            response.push(cabecera[i])
        }
        res.json(response)
    } catch (error) {
        console.log(error.message)
        res.json({ message: error.message })
    }
}

const getPago = async (req, res) => {
    try {
        const id_cabecera = req.params.id_cabecera
        console.log('ds', req.params.id_cabecera)
        const cabecera = await db.one(`SELECT*FROM public.cp_cabecera where id_cabecera = $1;`, [id_cabecera]);
        let response = [];
        let detallePago = await db.any(`SELECT det.* from cp_cabecera cab, cp_detalle det where cab.id_cabecera = det.id_cabecera and
            det.id_cabecera = $1;`, [cabecera.id_cabecera]);
        cabecera.cab_detalle = detallePago
        response.push(cabecera)
        res.json(response)
    } catch (error) {
        console.log(error.message)
        res.json({ message: error.message })
    }


}

const createPagoDetalle = async (req, res) => {
    const { id_cabecera, descripcion_pago, ruc_proveedor, cdgo_tipo_pago, fecha_pago, total, cab_estado, detalles } = req.body
    try {
        const cabecera = await db.one(`INSERT INTO public.cp_cabecera(
            id_cabecera, descripcion_pago, ruc_proveedor, cdgo_tipo_pago, fecha_pago, total, cab_estado)
            VALUES ($1, $2, $3, $4, $5, $6, $7)  returning*;`, [id_cabecera, descripcion_pago, ruc_proveedor, cdgo_tipo_pago, fecha_pago, total, cab_estado])

        //Insercion del detalle
        let detalle = []
        for (let i = 0; i < detalles.length; i++) {
            const response = await db.one(`INSERT INTO public.cp_detalle(id_cabecera, cantidad_a_pagar, fcom_id, saldo)
                    VALUES ( $1, $2, $3, $4) returning* ;`, [cabecera.id_cabecera, detalles[i].cantidad_a_pagar, detalles[i].fcom_id, detalles[i].saldo])
            detalle.push(response)
        }
        cabecera.cab_detalle = detalle
        res.json(cabecera)

    } catch (error) {
        console.log(error)
        res.json({
            message: 'Valores incorrectos'
        })
    }
}

const getAllFacturasbyProveedor = async (req, res) => {

    try {

        const { cedula_ruc } = req.params

        const facturas = await db.any(`SELECT cf.fcom_id, cf.pro_cedula_ruc, cf.fcom_credito_contado, 
        cf.fcom_fecha, cf.fcom_fechavencimiento, cf.fcom_total FROM cp_factura cf INNER JOIN
        cp_proveedor cp ON cp.prov_cedula_ruc = cf.pro_cedula_ruc WHERE cf.fcom_credito_contado= true  
        and cf.pro_cedula_ruc = $1`, [cedula_ruc]);
        res.json(facturas)
    } catch (error) {
        console.log(error)
        res.json({
            message: 'Valores incorrectos'
        })
    }

}

const getFacturas = async (req, res) => {
    try {
        const facturas = await db.any(`SELECT*FROM cp_factura;`);
        res.json(facturas)
    } catch (error) {
        console.log(error)
        res.json({
            message: 'Valores incorrectos'
        })
    }
}

const getFacturabyid = async (req, res) => {
    try {
        const { id } = req.params
        const facturas = await db.any(`SELECT * FROM cp_factura WHERE fcom_id = $1;`, [id]);
        res.json(facturas)
    } catch (error) {
        console.log(error)
        res.json({
            message: 'Valores incorrectos'
        })
    }
}

const updatePago = async (req, res) => {
    const { id_cabecera, cab_estado, descripcion_pago, ruc_proveedor, cdgo_tipo_pago, fecha_pago, total, detalles } = req.body
    try {
        //Insercion del cabecera
        const cabecera = await db.one(`UPDATE public.cp_cabecera SET   cab_estado=$2, descripcion_pago=$3, ruc_proveedor=$4, 
        cdgo_tipo_pago=$5,fecha_pago=$6,total=$7 WHERE id_cabecera=$1 RETURNING*;`,
            [id_cabecera, cab_estado, descripcion_pago, ruc_proveedor, cdgo_tipo_pago, fecha_pago, total])


        await db.none(`DELETE FROM public.cp_detalle WHERE id_cabecera=$1;`, [id_cabecera])

        //Insercion del detalle
        let detalle = [];
        for (let i = 0; i < detalles.length; i++) {
            const response = await db.one(`INSERT INTO public.cp_detalle(id_cabecera, cantidad_a_pagar, fcom_id, saldo)
                    VALUES ( $1, $2, $3, $4) returning* ;`, [cabecera.id_cabecera, detalles[i].cantidad_a_pagar, detalles[i].fcom_id, detalles[i].saldo])
            detalle.push(response)
        }

        cabecera.cp_detalle = response
        res.json(cabecera)
    } catch (error) {
        console.log(error.message)
        res.json({ message: error.message })
    }

}

const deletePago = async (req, res) => {
    try {
        const id_cabecera = req.params.id_cabecera
        console.log('ds', req.params.id_cabecera)
        const cabecera = await db.one(`UPDATE public.cp_cabecera SET cab_estado=false WHERE id_cabecera=$1 RETURNING*;`, [id_cabecera]);
        res.json(cabecera)
    } catch (error) {
        console.log(error.message)
        res.json({ message: error.message })
    }

}

module.exports = {
    getAllPago,
    getPago,
    createPagoDetalle,
    deletePago,
    updatePago,
    getPagos,
    getFacturas,
    getAllFacturasbyProveedor,
    getFacturabyid,
    getSumByFact,
    getReporte
}