const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create out User model
class User extends Model { };

// define table columns and configuration
User.init(
  {
    id:{
      type: DataTypes.INTEGER,
      allowNull:false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4]
      }
    }
  },
  {
    // TABLE CONFIGURATION OPRIONS FO HERE (httpls://squlize.org/v5/manual/models=definition.html#configuration)

    // pass in our imported seqeulize connection (the direction connection to our deta base) 
    sequelize,
    // don't automatically create createdAT/updatedAt timestamp field
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores intead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: 'user'
  });

  module.exports = User;