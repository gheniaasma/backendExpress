

const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
   username: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    cin: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },


    datenaiss: {
      type: DataTypes.DATE,
      allowNull: true,
    },


    rib: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Demande, {
      onDelete: "cascade",
    });

    // User.hasOne(models.profile, {
    //   onDelete: "cascade",
    // });
  };
  return User;
};
