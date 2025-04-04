import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { schema } from "./schema"; // Importa tu esquema GraphQL aquí

// Crea una instancia de Apollo Server
const server = new ApolloServer({
  schema,
});

// Exporta el manejador de Next.js para la ruta POST
export const POST = startServerAndCreateNextHandler(server);

// Si necesitas manejar otros métodos HTTP (opcional)
export const GET = POST;