const Sequelize = require('sequelize');

// sqlite3 database
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './sandbox.sqlite'
});

// check database connection
sequelize
.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database: ', err);
});

// call sync() method
sequelize.sync();

export default sequelize;