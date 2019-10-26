import { Dialect } from 'sequelize';

export default {
  database: {
    dialect: 'mysql' as Dialect,
    database: process.env.DATABASE_NAME || 'note_db',
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 3306,
    username: process.env.MYSQL_USER || 'note_db_user',
    password: process.env.MYSQL_PASS || 'note_db_pass',
  },
};
