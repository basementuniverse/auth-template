import app from './app';
import config from './config';
import { initialiseDatabase } from './database';

async function run() {
  return Promise.resolve()
    .then(() => {
      initialiseDatabase();
    })
    .then(() => {
      app.listen(config.port, () => {
        console.log(`Listening on port ${config.port}`);
      });
    })
    .catch(error => {
      console.error('Server execution error:', error);
    });
}

(async () => {
  run();
})();
