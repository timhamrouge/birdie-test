import * as dotenv from "dotenv";
dotenv.config();

import { DataTypes, Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USERNAME!,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOSTNAME,
    dialect: "mysql",
  }
);

const TestCareRecipient = sequelize.define(
  "TestCareRecipient",
  {
    id: {
      type: DataTypes.STRING(255),
      allowNull: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "test_care_recipients",
    timestamps: false,
  }
);

export default TestCareRecipient;
