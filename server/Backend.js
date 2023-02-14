const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const fuentesPagoRoutes = require('./routes/routes_FP')

const app = express();

app.use(cors());
app.use(morgan('dev'))
app.use(express.json())

app.use(fuentesPagoRoutes)

const PORT = process.env.PORT || 3799

app.use((err, req, res, next) => {
    return res.json({
        message: err.message
    })
})

app.listen(PORT);
console.log(`Server escuchando en el puerto: ${PORT}`)