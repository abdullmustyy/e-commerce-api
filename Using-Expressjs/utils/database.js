import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "node_complete",
  "root",
  "Gbalamiluvsukky03",
  {
    dialect: "mysql",
    host: "localhost",
  }
);
