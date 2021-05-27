const mongoose = require('mongoose');

const ProductsSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: true,
        trim: true
    },
    existencia: {
        type: Number,
        require: true,
        trim: true
    },
    precio: {
        type: Number,
        require: true,
        trim: true
    },
    creado: {
        type: Date,
        default: Date.now()
    },
})

module.exports = mongoose.model('Producto', ProductsSchema);