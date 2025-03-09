import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { ApolloServer } from 'apollo-server-express';
import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import productRoutes from './src/routes/productRoutes.js';
import { typeDefs } from './src/graphql/schema.js';
import { resolvers } from './src/graphql/resolvers/index.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
}).then(() => {
  console.log("🟢 MongoDB connecté");
}).catch(err => {
  console.error("🔴 Erreur de connexion MongoDB :", err);
});

const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const server = new ApolloServer({ typeDefs, resolvers });

async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  if (process.env.NODE_ENV !== 'test') {
    app.listen(5001, () => {
      console.log("🚀 Serveur REST démarré sur le port 5001");
      console.log(`🚀 GraphQL disponible sur http://localhost:5001/graphql`);
    });
  }
}

startApolloServer();

export default app;