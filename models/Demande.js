const { DataTypes } = require ("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const Demande=sequelize.define('Demande',{

        situation_professionnelle:{
            type:DataTypes.STRING,
            allowNull:false
        },
        Revenu_mensuel:{
            type:DataTypes.STRING,
            allowNull:false
        },
        Montant:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        objet:{
            type:DataTypes.STRING,
            allowNull:false
        },
        garantie_propose:{
            type:DataTypes.STRING,
            allowNull:false
        },
        periode_renbourcement:{
            type:DataTypes.STRING,
            allowNull:false
        },
        statut:{
            type:DataTypes.STRING,
            allowNull:false
        },
        date:{
            type:DataTypes.DATE,
            allowNull:false
        },
        Etat_demande:{
            type:DataTypes.STRING,
            defaultValue:"en cours"
        },

    });
Demande.associate=models=>{

    Demande.belongsTo(models.Type,{
        onDelete:"cascade"
    }),
    Demande.belongsTo(models.User,{
        onDelete:"cascade"
    })
  
}
    return Demande;
}


