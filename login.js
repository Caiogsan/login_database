import { fastify } from "fastify";
import fastifyCors from "@fastify/cors"
import { Database } from "./database.js";

const server = fastify();
const database = new Database();

server.register(fastifyCors, {
  origin: "http://localhost:3000"
})

server.addHook("onRequest", (req, res, done) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "http:localhost:3000");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  done();
});

server.post("/login389212", async (req, res) => {
  const { email, username, password } = req.body;

  await database.create({
    email,
    username,
    password,
  });

  return res.status(201).send();
});

server.get("/login389212", async (req) => {
  const search = req.query.search;

  const users = await database.list(search);

  return users;
});

server.put("/login389212", async(req, res) => {
    const userId = req.params.id
    const { email, username, password } = req.body

    await database.update(userId, {
        email,
        username,
        password
    })

    return res.status(204).send()
})

server.delete('/login389212/:id', async(req, res) => {
    const userId = req.params.id

    await database.delete(userId)

    return res.status(204).send()
})

server.listen({
    port: process.env.PORT ?? 3333,
    host: '0.0.0.0'
})