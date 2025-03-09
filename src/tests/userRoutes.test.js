import request from "supertest";
import app from "../../server.js";
import mongoose from "mongoose";

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
      name: "jhg",
      email: "ghb@example.com",
      password: "vb"
    };
    const res = await request(app).post("/api/users").send(newUser);
    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe(newUser.email);
  });
});
