const { DataTypes } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const User=sequelize.define('User',{
        nom_user:{
            type:DataTypes.STRING,
            allowNull:false
        },
        prenom_user:{
            type:DataTypes.STRING,
            allowNull:false
        },
       email:{
            type:DataTypes.STRING,
            allowNull:false
        },
        adresse:{
            type:DataTypes.STRING,
            allowNull:false
        },
      
    });
    

User.associate=models=>{

    User.hasMany(models.Demande,{
        onDelete:"cascade"
    })
}
    return User;
}