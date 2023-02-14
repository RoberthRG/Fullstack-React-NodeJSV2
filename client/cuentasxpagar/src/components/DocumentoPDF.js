import React from "react";
import {
  Text,
  View,
  Document,
  StyleSheet,
  Page,
  Image,
} from "@react-pdf/renderer";
import cuentasxpagar from "../assets/cuentasporpagar.png";
import logo_cxp from "../assets/logo_cxp.png";
import ViewProvider from "./ViewProvider";

const COL_ANCHO_1 = 12;
const COL_ANCHO_2 = 17;
const styles = StyleSheet.create({
  tabla: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 20,
  },
  tablaFila: {
    margin: "auto",
    flexDirection: "row",
  },
  tablaColumna1: {
    width: COL_ANCHO_1 + "%",
    borderStyle: "solid",
    borderColor: "#000",
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tablaColumna2: {
    width: COL_ANCHO_2 + "%",
    borderStyle: "solid",
    borderColor: "#000",
    borderBottomColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tablaCeldaHeader: {
    margin: 5,
    fontSize: 10,
    fontWeight: 500,
  },
  anchoColumna1: {
    width: COL_ANCHO_1 + "%",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  anchoColumna2: {
    width: COL_ANCHO_2 + "%",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tablaCelda: {
    margin: 5,
    fontSize: 10,
  },
  page: {
    backgroundColor: "#FFFFFF",
    color: "black",
  },
});

// Create Document Component
const DocumentoPDF = (props) => {
  const { datos: datosProvedor, facturas, idproveedor } = props;
  console.log(facturas);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={{ padding: "15px" }}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Image src={cuentasxpagar} alt="" style={{ width: "100px" }} />
            </View>
            <View style={{ flex: 2 }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Image src={logo_cxp} alt="" />
                <Text style={{ textAlign: "center", fontSize: "12px" }}>
                  REPORTE DE SEGUIMIENTO DE PAGOS A PROVEEDORES
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: "13px",
                    fontWeight: "bold",
                  }}
                >
                  MODULO DE CUENTAS POR PAGAR
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: "13px",
                    fontWeight: "bold",
                  }}
                >
                  Ibarra - Imbabura
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: "13px",
                    fontWeight: "bold",
                  }}
                >
                  27 de noviembre y Bolivar
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: "13px",
                    fontWeight: "bold",
                  }}
                >
                  Celular: (+593) 9999999999
                </Text>
              </View>
            </View>
            <View style={{ flex: 2 }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: "5px",
                  border: "1px solid #000",
                  padding: "20px",
                  borderRadius: "10px",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  R.U.C. 1000992651001
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  REPORTE DE SEGUIMIENTO
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "20px",
          }}
        >
          <ViewProvider data={datosProvedor} />
        </View>

        <View style={styles.tabla}>
          <View style={styles.tablaFila}>
            <View style={styles.tablaColumna1}>
              <Text style={styles.tablaCeldaHeader}> FECHA DE PAGO</Text>
            </View>
            <View style={styles.tablaColumna2}>
              <Text style={styles.tablaCeldaHeader}> DNI </Text>
            </View>
            <View style={styles.tablaColumna1}>
              <Text style={styles.tablaCeldaHeader}> TIPO DE PAGO </Text>
            </View>
            <View style={styles.tablaColumna2}>
              <Text style={styles.tablaCeldaHeader}> CABECERA </Text>
            </View>
            <View style={styles.tablaColumna2}>
              <Text style={styles.tablaCeldaHeader}> CODIGO DE FACTURA </Text>
            </View>
            <View style={styles.tablaColumna1}>
              <Text style={styles.tablaCeldaHeader}> DEBE </Text>
            </View>
            <View style={styles.tablaColumna1}>
              <Text style={styles.tablaCeldaHeader}> PAGO </Text>
            </View>
          </View>

          {facturas.map(
            (factura, index) =>
              idproveedor === factura.ruc_proveedor && (
                <View style={styles.tablaFila} key={index}>
                 <View style={styles.anchoColumna1}>
                    <Text style={styles.tablaCelda}>{new Date(factura.fecha_pago).toLocaleDateString()}</Text>
                  </View>
                  <View style={styles.anchoColumna2}>
                    <Text style={styles.tablaCelda}>
                      {factura.ruc_proveedor}
                    </Text>
                  </View>
                  <View style={styles.anchoColumna1}>
                    <Text style={styles.tablaCelda}>
                      {factura.cdgo_tipo_pago}
                    </Text>
                  </View>
                  <View style={styles.anchoColumna2}>
                    <Text style={styles.tablaCelda}>{factura.id_cabecera}</Text>
                  </View>
                  <View style={styles.anchoColumna2}>
                    <Text style={styles.tablaCelda}>{factura.fcom_id}</Text>
                  </View>
                  <View style={styles.anchoColumna1}>
                    <Text style={styles.tablaCelda}>
                      {(factura.debe).toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.anchoColumna1}>
                    <Text style={styles.tablaCelda}>{factura.pago}</Text>
                  </View>
                </View>
              )
          )}
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "70px",
            justifyContent: "flex-end",
          }}
        ></View>
      </Page>
    </Document>
  );
};

export default DocumentoPDF;