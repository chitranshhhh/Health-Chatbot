import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const UserSession = sequelize.define("UserSession", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    login_timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    logout_timestamp: { type: DataTypes.DATE, allowNull: true },
    ip_address: { type: DataTypes.STRING },
    user_agent: { type: DataTypes.STRING }
});

export default UserSession;
