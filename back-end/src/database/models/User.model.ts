import { BOOLEAN } from 'sequelize';
import { Model, INTEGER, STRING, DATEONLY } from 'sequelize';
import db from '.';

class User extends Model {
  id!: number;
  name!: string;
  email!: string;
  password!: string;
  driver!: boolean;
  admin!: boolean;
  birthday!: Date;
  license!: number;
  controller!: string;
}

User.init(
  {
    id: {
      allowNull: false,
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      allowNull: false,
      type: STRING,
    },
    
    email: {
      allowNull: false,
      type: STRING,
      unique: true
    },

    password: {
      allowNull: false,
      type: STRING,
    },

    driver: {
      allowNull: true,
      type: BOOLEAN,
      defaultValue: true,
    },

    admin: {
      allowNull: true,
      type: BOOLEAN,
      defaultValue: false,
    },

    birthday: {
      allowNull: false,
      type: DATEONLY,
    },

    license: {
      allowNull: false,
      type: INTEGER,
      defaultValue: 0,
    },

    controller: {
      allowNull: true,
      type: STRING,
    }
  },
  {
    sequelize: db,
    modelName: 'users',
    timestamps: false,
  }
);

export default User;