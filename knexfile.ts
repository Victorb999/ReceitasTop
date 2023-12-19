import path from "path";

module.exports = {
  client: "pg",
  connection:
    "postgresql://Victorb999:lckJFjIhQ6z3@ep-calm-haze-67502538.us-east-2.aws.neon.tech/receitaTop?sslmode=require",
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
