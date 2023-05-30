import { DataTypes } from "sequelize";

import sequelize from "./db";

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
