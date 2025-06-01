module.exports = {
  development: {
    username: "admin",
    password: "admin123",
    database: "BANK",       // 💾 C'est bien "BANK" d'après ton docker-compose
    host: "localhost",       // Host de ta machine pour Docker
    port: 3002,              // Port mappé de Docker vers ta machine
    dialect: "postgres"
  }
};
