// Db
import { DataTypes}  from 'sequelize'
import { db } from '../service/db'

export const users = db.define('users',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: true
        },
        login: {
            type: DataTypes.STRING,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        rt: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },
    // Опции
    {
        timestamps: false
    }
)