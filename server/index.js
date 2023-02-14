const express = require('express')

const path = require('path')

const app = express()

const morgan = require('morgan');
const cors = require('cors');

const fuentesPagoRoutes = require('./routes/routes_FP')

//const pagoRoutes = require('./routes/pagos.routes');

app.use(morgan('dev'))
app.use(express.json())
app.use(express.static(path.join(__dirname + "/public")))
app.use(fuentesPagoRoutes)
app.use(cors());

const PORT = process.env.PORT || 3799

// Manejar las peticiones GET en la ruta /api
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server! :D Mmmmm" });
});

app.use((err, req, res, next) => {
    return res.json({
        message: err.message
    })
})


app.listen(PORT)