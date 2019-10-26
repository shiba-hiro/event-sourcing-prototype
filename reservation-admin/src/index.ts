/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express';
import AdminBro from 'admin-bro';

import Logger from './Logger';
import opts from './admin-bro-options';

const AdminBroExpress = require('admin-bro-expressjs');
const AdminBroSequelize = require('admin-bro-sequelizejs');

AdminBro.registerAdapter(AdminBroSequelize);
const adminBro = new AdminBro(opts);

const router = AdminBroExpress.buildRouter(adminBro);

const app: express.Application = express();
const port: string = process.env.PORT || '3000';

app.use(adminBro.options.rootPath, router);
app.use(express.json());

app.listen(port, () => {
  Logger.info(`Listening at http://localhost:${port}/`);
});
