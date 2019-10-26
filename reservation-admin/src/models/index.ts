import { Sequelize } from 'sequelize';
import fs from 'fs';
import path from 'path';

import config from '../config';

const basename = path.basename(__filename);
const db: Record<string, any> = {};

const sequelize = new Sequelize(config.database);

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js' || file.slice(-3) === '.ts'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export { db };
