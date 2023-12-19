import knex from "knex";
import "dotenv/config";

const connection = knex({
  client: "pg",
  connection: process.env.NODE_DB_CONNECTION,
  searchPath: ["knex", "public"],
  useNullAsDefault: true,
});

export default connection;
