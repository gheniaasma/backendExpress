const { DataTypes } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Type=sequelize.define('Type',{
        nom_type:{
            type:DataTypes.STRING,
            allowNull:false
        },
        caracteristique:{
            type:DataTypes.STRING,
            allowNull:false
        },
      
    });
    

Type.associate=models=>{

    Type.hasMany(models.Demande,{
        onDelete:"cascade"
    })
}
    return Type;
}



