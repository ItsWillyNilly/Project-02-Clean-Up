const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataTypes) {
    let User = sequelize.define("users", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6, 30]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6, 30]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        }
    });

    User.associate = function (models) {
        User.hasMany(models.Item, {
            foerignKey: 'userId',
            as: "items"
        });

        User.prototype.validPassword = function (password) {
            return bcrypt.compareSync(password, this.password);
        };

        User.addHook("beforeCreate", function (user) {
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
        });
    };

    return User;

};
