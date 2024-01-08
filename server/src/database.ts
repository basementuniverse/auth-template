import { knex } from 'knex';
import path from 'path';
import config from './config';

const database = knex({
  client: config.database.client,
  connection: {
    filename: path.resolve(__dirname, config.database.path),
  },
  useNullAsDefault: true,
});

export async function initialiseDatabase(): Promise<void> {
  if (!(await database.schema.hasTable('users'))) {
    try {
      await database.schema.createTable('users', table => {
        table.string('id').primary();
        table.dateTime('createdAt');
        table.string('firebaseUid').unique();
        table.string('displayName').nullable();
      });
    } catch (error) {
      console.error(`An error occurred while creating users table: ${error}`);

      return;
    }

    console.log('Created users table');
  }
}

export default database;
