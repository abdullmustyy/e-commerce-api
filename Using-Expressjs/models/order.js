import { Sequelize } from "sequelize";
import { sequelize } from "../utils/database.js";

export const Order = sequelize.define("order", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});
