import knex from "knex";
import path from "path";

const connection = knex({
  client: "pg",
  connection:
    "postgresql://Victorb999:lckJFjIhQ6z3@ep-calm-haze-67502538.us-east-2.aws.neon.tech/receitaTop?sslmode=require",
  searchPath: ["knex", "public"],
  useNullAsDefault: true,
});

export default connection;
