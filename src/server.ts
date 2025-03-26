import { app } from "./app";

app
  .listen({
    host: "0.0.0.0",
    port: 3333,
  })
  .then(() => {
    console.log("🚀 HTTP Server running!");
  });

app.get("/status", async (request, reply) => {
  return reply.send();
});
