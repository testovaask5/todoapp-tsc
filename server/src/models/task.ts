import { Sequelize, Model, DataTypes } from "sequelize";

const sequelize = new Sequelize('San_react_ov4', 'san', '2eJi7o', {
    host: '109.206.169.221',
    dialect: 'mysql'
});

interface ITask {
    text: string
    completed: boolean
}

export default class Task extends Model<ITask> implements ITask {
    text: string;
    completed: boolean;
}

Task.init({
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    tableName: 'tasks',
    sequelize
})
