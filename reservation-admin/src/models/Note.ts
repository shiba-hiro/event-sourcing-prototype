import Root, { Sequelize } from 'sequelize';
import uuid from 'uuid/v4';

module.exports = (sequelize: Sequelize) => {
  const Note = sequelize.define('Note', {
    id: {
      primaryKey: true,
      type: Root.STRING,
      defaultValue: uuid,
      allowNull: false,
    },
    title: {
      type: Root.STRING,
      allowNull: false,
    },
    content: {
      type: Root.STRING,
      allowNull: true,
      defaultValue: null,
    },
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'notes',
  });
  // Note.associate = function (models) {
  //   // associations can be defined here
  // }
  return Note;
};
