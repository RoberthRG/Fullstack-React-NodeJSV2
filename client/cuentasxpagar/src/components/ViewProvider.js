import { Text, View } from "@react-pdf/renderer";
import React from "react";

const ViewProvider = (data) => {
  const { data: datosProvedor } = data

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "20px",
        textAlign: "left",
      }}
    >
      <View style={{}}>
        <Text style={{ fontSize: "12px" }}>
          PROVEEDOR: {datosProvedor.pro_nombre}
        </Text>
        <br />
        <Text style={{ fontSize: "12px" }}>
          CEDULA/RUC: {datosProvedor.pro_cedula_ruc}
        </Text>
        <br />
        <Text style={{ fontSize: "12px" }}>
          DIRECCIÓN: {datosProvedor.pro_direccion}
        </Text>
        <br />
        <Text style={{ fontSize: "12px" }}>
          TELÉFONO: {datosProvedor.pro_telefono}
        </Text>
        <br />
        <Text style={{ fontSize: "12px" }}>
          CORREO: {datosProvedor.pro_correo}
        </Text>
      </View>

    </div>
  );
};

export default ViewProvider;
