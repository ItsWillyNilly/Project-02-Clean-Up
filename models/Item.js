module.exports = function (sequelize, DataTypes) {
    let Item = sequelize.define("item", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        condition: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        }
    });

    Item.associate = function (models) {
        Item.belongsTo(models.User, { 
            foreignKey: 'userId',
            as: 'user'
        });

        return Item;
    };
};

