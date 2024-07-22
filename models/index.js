const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

const config = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres'
  };

const db = {};

let sequelize;

if (process.env.NODE_ENV === 'production') {
    // use production database URL
    sequelize = new Sequelize(process.env.DATABASE_URL, config);
  } else {
    // use local database
    sequelize = new Sequelize(config.database, config.username, config.password, config);
  }

fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        console.log(model.name);
        db[model.name] = model;
    });

    Object.values(db)
    .filter(model => typeof model.associate === 'function')
    .forEach(model => model.associate(db));


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;




// const User = require ("./User");
// const Post = require ("./Item");

// User.hasMany(Post,{
//     foreignKey: "user_id",
//     onDelete: "CASCADE"
//     });

// Post.belongsTo(User,{
//     foreignKey: "user_id"
//     });
    
// module.exports = {User, Post};