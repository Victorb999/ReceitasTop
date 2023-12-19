import path from "path";
import "dotenv/config";

module.exports = {
  client: "pg",
  connection: process.env.NODE_DB_CONNECTION,
  searchPath: ["knex", "public"],
  migrations: {
    directory: path.resolve(__dirname, "src", "database", "migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, "src", "database", "seeds"),
  },
  useNullAsDefault: true,
};
//npx knex --knexfile knexfile.ts migrate:latest
