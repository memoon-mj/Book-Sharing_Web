const Sequelize = require('sequelize');

module.exports = class Book extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      content: {
        type: Sequelize.STRING(140),
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(140),
        allowNull: false,
      },
      subject: {
        type: Sequelize.STRING(140),
        allowNull: false,
      },
      img: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      borrow: {
        type: Sequelize.STRING(10),
        allowNull:true,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Book',
      tableName: 'books',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Book.belongsTo(db.User);
    db.Book.belongsToMany(db.Hashtag, { through: 'BookHashtag' });
  }
};
