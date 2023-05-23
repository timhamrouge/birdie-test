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

const Event = sequelize.define(
  "Event",
  {
    payload: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    alert_id: {
      type: DataTypes.CHAR(36),
      allowNull: true,
    },
    task_instance_id: {
      type: DataTypes.CHAR(255),
      allowNull: true,
    },
    visit_id: {
      type: DataTypes.CHAR(36),
      allowNull: true,
    },
    caregiver_id: {
      type: DataTypes.CHAR(36),
      allowNull: true,
    },
    payload_as_text: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    rejected_event_id: {
      type: DataTypes.CHAR(255),
      allowNull: true,
    },
    observation_event_id: {
      type: DataTypes.CHAR(255),
      allowNull: true,
    },
    timestamp: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    id: {
      type: DataTypes.CHAR(36),
      allowNull: true,
      primaryKey: true,
    },
    event_type: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    care_recipient_id: {
      type: DataTypes.CHAR(36),
      allowNull: true,
    },
  },
  {
    tableName: "events",
    timestamps: false,
  }
);

export default Event;
