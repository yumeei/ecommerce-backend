import request from "supertest";
import app from "../../server.js";
import mongoose from "mongoose";

let userId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Tests sur les utilisateurs", () => {
  it("🔍 Devrait récupérer tous les utilisateurs", async () => {
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("Devrait créer un utilisateur", async () => {
    const newUser = {
      name: "test4",
      email: "test4@example.com",
      password: "test"
    };
    const res = await request(app).post("/api/users").send(newUser);
    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe(newUser.email);

    userId = res.body._id;
    expect(userId).toBeDefined();
  });

  it("Devrait refuser la création d'un utilisateur sans email", async () => {
    const invalidUser = {
      name: "test user",
      password: "testpassword"
    };
    const res = await request(app).post("/api/users").send(invalidUser);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Tous les champs (name, email, password) sont requis.");
  })

  it("Devrait supprimer un utilisateur", async () => {
    const res = await request(app).delete(`/api/users/${userId}`)
      // .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Utilisateur supprimé avec succès");
  });

  it("Devrait renvoyer une erreur 404 pour une suppression d'un utilisateur inexistant", async () => {
    const res = await request(app).delete(`/api/users/${userId}`)
      // .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Utilisateur non trouvé");
  });
});
