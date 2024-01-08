import * as firebase from 'firebase-admin';
import config from '../config';

if (config.env !== 'test') {
  firebase.initializeApp({
    credential: firebase.credential.cert(config.firebase),
  });
}

export default firebase;
