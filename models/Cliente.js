const mongoose = require('mongoose');

const ClientesSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: true,
        trim: true
    },
    apellido: {
        type: String,
        require: true,
        trim: true
    },
    empresa: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    telefono: {
        type: String,
        // require: true,
        trim: true
    },
    creado: {
        type: Date,
        default: Date.now()
    },
    VendorId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Usuario'
    }
})

module.exports = mongoose.model('Cliente', ClientesSchema);