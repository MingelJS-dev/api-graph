const Usuario = require("../models/Usuario");
const Producto = require("../models/Producto");
const Cliente = require("../models/Cliente");

const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: 'variables.env' })

const createToken = (user, secret, expiresIn) => {
    const { id, nombre, email, apellido } = user

    return jwt.sign({ id, nombre, email, apellido }, secret, { expiresIn })
}
// Resolvers
const resolvers = {
    Query: {
        getUser: async (_, { token }) => {
            const UserId = await jwt.verify(token, process.env.SECRET)

            return UserId
        },
        getProducts: async () => {
            try {
                const products = await Producto.find({})

                return products
            } catch (error) {
                console.log(error)
            }
        },
        getProductById: async (_, { id }) => {
            // Existe
            const product = await Producto.findById(id)

            if (!product) {
                throw new Error('No existe el producto')
            }

            return product
        },
        getClients: async () => {
            try {
                const clients = await Cliente.find({})

                return clients
            } catch (error) {
                console.log(error)
            }
        },
        getClientByVendor: async (_, { }, ctx) => {
            try {
                const clients = await Cliente.find({ VendorId: ctx.user.id.toString() })

                return clients;
            } catch (error) {
                console.log(error)
            }
        },
        getClientById: async (_, { id }, ctx) => {
            // Existe
            const client = await Cliente.findById(id)

            if (!client) {
                throw new Error('No existe el cliente')
            }

            if (client.VendorId.toString() !== ctx.user.id.toString()) {
                throw new Error('No tiene las credenciales')
            }

            return client
        }
    },
    Mutation: {
        nuevoUsuario: async (_, { input }) => {
            const { email, password } = input
            // Revisar si no existe
            const exist = await Usuario.findOne({ email });

            if (exist) {
                throw new Error('Ya existe');
            }
            // Hashear pass
            const salt = bcryptjs.genSaltSync(10);
            input.password = bcryptjs.hashSync(password, salt);

            try {
                // Guardar en db
                const usuario = new Usuario(input)
                usuario.save()

                return usuario
            } catch (error) {
                console.log(error)
            }
        },
        autenticarUsuario: async (_, { input }) => {
            const { email, password } = input

            // Exist 
            const exist = await Usuario.findOne({ email })

            if (!exist) {
                throw new Error('No existe')
            }

            // Validate pass
            const isPass = bcryptjs.compareSync(password, exist.password)
            if (!isPass) {
                throw new Error('Password incorrect')
            }

            // Token
            return {
                token: createToken(exist, process.env.SECRET, '24h')
            }

        },
        nuevoProducto: async (_, { input }) => {
            try {
                const product = await Producto(input)

                const result = await product.save()

                return result
            } catch (error) {
                console.log(error)
            }
        },
        updateProduct: async (_, { id, input }) => {
            // Existe
            let product = await Producto.findById(id)

            if (!product) {
                throw new Error('No existe el producto')
            }

            // Actualizar
            product = await Producto.findOneAndUpdate({ _id: id }, input, { new: true })

            return product
        },
        deleteProduct: async (_, { id }) => {
            let product = await Producto.findById(id)

            if (!product) {
                throw new Error('No existe el producto')
            }

            await Producto.findOneAndDelete({ _id: id });

            return "Producto eliminado"
        },
        newClient: async (_, { input }, ctx) => {
            const { email } = input
            // Verificar
            const client = await Cliente.findOne({ email })

            if (client) {
                throw new Error('El cliente ya esta registrado')
            }

            // Asignar vendedor
            input.VendorId = ctx.user.id

            // Save
            const newClient = await Cliente(input)
            const result = await newClient.save()

            return result
        },
        updateClient: async(_, {id, input}, ctx) => {
            let client = await Cliente.findById(id)

            if(!client) {
                throw new Error('No existe el cliente')
            }

            if (client.VendorId.toString() !== ctx.user.id.toString()) {
                throw new Error('No tiene las credenciales')
            }

            client = await Cliente.findOneAndUpdate({_id: id}, input, {new: true})

            return client
        },
        deleteCliente: async(_, { id }, ctx) => {
            let client = await Cliente.findById(id)

            if(!client) {
                throw new Error('No existe el cliente')
            }

            if (client.VendorId.toString() !== ctx.user.id.toString()) {
                throw new Error('No tiene las credenciales')
            }

            await Cliente.findOneAndDelete({ _id: id });

            return "Cliente eliminado"
        }
    }
}

module.exports = resolvers;