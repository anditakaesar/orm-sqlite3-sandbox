const Sequelize = require('sequelize');

// sqlite3 database
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite3',
    logging: false,
    sync: { force: false } // do not force sync, use migration instead
});

// check database connection
sequelize
.authenticate()
.then(() => {
    // console.log('Connection has been established successfully.');
})
.catch(err => {
    // console.error('Unable to connect to the database: ', err);
});

// call sync() method first only to initialize table if not exists 
// sequelize.sync();

export default sequelize;