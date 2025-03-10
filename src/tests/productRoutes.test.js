import request from 'supertest';
import app from '../../server.js';
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

let productId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Tests sur les produits", () => {

  it("Devrait récupérer tous les produits", async () => {
    const res = await request(app).get("/api/products");
    expect(res.statusCode).toBe(200);
  });

  it("Devrait créer un produit", async () => {
    const newProduct = {
      name: "Test Produit",
      price: 100,
      description: "Ceci est un produit de test",
      category: "TestCat",
      stock: 10,
    };

    const res = await request(app).post("/api/products").send(newProduct);

    expect(res.statusCode).toBe(201);

    productId = res.body._id;
    expect(productId).toBeDefined();
  });

  it("Devrait refuser la création d'un produit sans nom", async () => {
    const invalidProduct = {
      price: 50,
      description: 'test description',
      stock: 5,
      category: 'test category'
    };

    const res = await request(app).post("/api/products").send(invalidProduct);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Tous les champs (name, price, description, stock, category) sont requis.");
  });

  it("✏ Devrait mettre à jour un produit", async () => {
    const updatedData = {
      name: "Produit Mmdifié",
      price: 120,
    };

    const res = await request(app).patch(`/api/products/${productId}`).send(updatedData);

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(updatedData.name);
    expect(res.body.price).toBe(updatedData.price);
  });

  it("Devrait renvoyer une erreur 404 pour un produit inexistant(update)", async () => {
    const res = await request(app).patch(`/api/products/65f2c49f9c8b9a0012345678`).send({
      name: "Produit Inexistant",
    });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Produit non trouvé");
  });

  it("Devrait supprimer un produit", async () => {
    const res = await request(app).delete(`/api/products/${productId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Produit supprimé avec succès");
  });

  it("Devrait renvoyer une erreur 404 pour une suppression d'un produit inexistant", async () => {
    const res = await request(app).delete(`/api/products/${productId}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Produit non trouvé");
  });
});
