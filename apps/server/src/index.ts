require("dotenv").config();
import "reflect-metadata";
import path from "node:path";
import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import { RegisterResolver } from "./modules/school/Register";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import { LoginResolver } from "./modules/user/Login";

async function bootstrap() {
  const app = express();
  const httpServer = http.createServer(app);

  // Build TypeGraphQL executable schema
  const schema = await buildSchema({
    // Array of resolvers
    resolvers: [RegisterResolver, LoginResolver],
    // Create 'schema.graphql' file with schema definition in current directory
    emitSchemaFile: path.resolve(__dirname, "schema.graphql"),
    validate: true,
  });

  // Create GraphQL server
  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server)
  );
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
}

bootstrap().catch(console.error);
