const { ApolloServer } = require('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');
const conectarDB = require('./config/db');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' })
//Conectar al Server
conectarDB()

// Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        // console.log(req.headers['authorization'])
        const token = req.headers['authorization'] || ''

        if (token) {
            try {
                const user = jwt.verify(token, process.env.SECRET)
                return {
                    user
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
});

// Run server
server.listen().then(({ url }) => {
    console.log(`Server listen on URL ${url}`)
})