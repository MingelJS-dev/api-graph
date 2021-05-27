const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env'})

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('Conectado')
    } catch (error) {
        console.log('Hubo en error al conectar al server.');
        console.log(error)
        process.exit(1)
    }
}

module.exports = conectarDB;