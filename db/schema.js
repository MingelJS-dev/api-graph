const { gql } = require('apollo-server')

// Schema
const typeDefs = gql`
    type Usuario {
        id: ID
        nombre: String
        apellido: String
        email: String
        creado: String
    }

    type Token {
        token: String
    }

    type Producto {
        id: ID
        nombre: String
        existencia: Int
        precio: Float
        creado: String
    }

    type Cliente {
        id: ID
        nombre: String
        apellido: String
        empresa: String
        email: String
        telefono: String
        VendorId: ID
    }

    input UsuarioInput {
        nombre: String!
        apellido: String!
        email: String!
        password: String!
    }

    input AutenticarInput {
        email: String!
        password: String!
    }

    input ProductoInput {
        nombre: String!
        existencia: Int!
        precio: Float!
    }

    input ClientInput {
        nombre: String!
        apellido: String!
        empresa: String!
        email: String!
        telefono: String
    }

    type Query {
        # Usuarios
        getUser(token: String!) : Usuario

        # Productos
        getProducts: [Producto]
        getProductById(id: ID!) : Producto

        #Clientes
        getClients: [Cliente]
        getClientByVendor : [Cliente]
        getClientById(id: ID!) : Cliente
    }

    type Mutation {
        # Usuarios
        nuevoUsuario(input: UsuarioInput) : Usuario
        autenticarUsuario(input: AutenticarInput) : Token
        
        # Productos
        nuevoProducto(input: ProductoInput) : Producto
        updateProduct(id: ID!, input: ProductoInput) : Producto
        deleteProduct(id: ID!) : String

        #Clientes
        newClient(input: ClientInput) : Cliente
        updateClient(id: ID!, input: ClientInput) : Cliente
        deleteCliente(id: ID!) : String
    }

`;

module.exports = typeDefs;