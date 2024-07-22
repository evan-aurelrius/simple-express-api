module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define('book', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false
      },
      publishedYear: {
        type: Sequelize.INTEGER
      }
    });
  
    return Book;
  }