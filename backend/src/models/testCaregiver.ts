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

const TestCaregiver = sequelize.define(
  "TestCaregiver",
  {
    id: {
      type: DataTypes.STRING(255),
      allowNull: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "test_caregivers",
    timestamps: false,
  }
);

export default TestCaregiver;
