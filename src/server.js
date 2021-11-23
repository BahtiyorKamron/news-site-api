import { ApolloServer,gql } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express'
import http from 'http'
import {regRouter} from './register/index.js'
import {logRouter} from './login/index.js'
import {categoryRouter} from './categories/index.js'
import {news} from './news/index.js'
const typeDefs = gql`
      type Query{
        user:String!
      }
`
const resolvers={
  Query:{
    user:()=>'kamron'
  }
}

;(async () => {
  const app = express();
  const httpServer = http.createServer(app);
  app.use(express.json())
  app.use(logRouter)
  app.use(regRouter)
  app.use(categoryRouter)
  app.use(news)
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app  })

  await new Promise(resolve => httpServer.listen({ port: 1889 }, resolve))
  console.log(`🚀 Server ready at http://localhost:1889{server.graphqlPath}`)
})()
