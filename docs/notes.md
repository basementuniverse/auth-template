# Notes

## Overview

The server (in `/server`) is Node.js and express. The database is SQLite.

The client (in `/client`) is React.

## Authentication

Authentication is provided by firebase.

The server uses the firebase admin SDK to verify the token sent by the client.

The client uses the firebase web SDK to sign in and get a token.

## Firebase setup

1. Create a new project in the firebase console (https://console.firebase.google.com/).
2. Add a web-app to the project.
3. Under Authentication, enable email/password sign-in.
4. Under Settings / Service Accounts, click "Generate new private key". Place the resulting JSON file in the server directory. In this case, it is named `firebase.json` and is pulled into `/server/src/config.ts`.
5. Under General / SDK setup and configuration, select the "Config" option. Copy the resulting JSON into the client directory. In this case, it is pasted directly into `/client/src/config.ts`.
6. Under Authentication, go to Templates, click Edit, then customise the action URL. In this case, it's the client "Actions" URL (`http://localhost:3000/action`).
7. Enable Google authentication.
8. Enable Github authentication.
9. Go to https://github.com/settings/applications/new and create a new application.
10. Copy the URL provided in the firebase console into the github app callback URL field (in this case, it's https://auth-template-f736b.firebaseapp.com/__/auth/handler)
11. Copy in the github client id and generate a secret, copy them into the Github auth config in firebase.
