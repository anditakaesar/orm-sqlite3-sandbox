const UserConst = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};

export default UserConst;

// module.exports = (sequelize, DataTypes) => {
//   const User = sequelize.define('User', {
//     firstName: DataTypes.STRING,
//     lastName: DataTypes.STRING,
//     email: DataTypes.STRING,
//     active: DataTypes.BOOLEAN
//   }, {});
//   User.associate = function(models) {
//     // associations can be defined here
//   };
//   return User;
// };