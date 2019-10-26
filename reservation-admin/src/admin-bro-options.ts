import AdminBroOptions from 'admin-bro/src/admin-bro-options.interface';
import { db } from './models';

const menu = { sequelize: { name: 'Sequelize Resources', icon: 'icon-mysql' } };
const opts: AdminBroOptions = {
  resources: [
    {
      resource: db.sequelize.models.Note,
      options: {
        parent: menu.sequelize,
        listProperties: ['id', 'title'],
        editProperties: ['title', 'content'],
        sort: { direction: 'asc' as ('asc' | 'desc'), sortBy: 'id' },
      },
    },
  ],
  version: {
    admin: true,
  },
  branding: {
    companyName: 'reservation admin',
  },
  rootPath: '/admin',
};

export default opts;
