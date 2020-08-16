## Description

Backend developed with [Nest](https://github.com/nestjs/nest), using as database mongodb.

## Requirements

It is necessary to install nodejs, npm and [nestjs cli](https://docs.nestjs.com/)

## Environment Variables

In the repository you will find a file called .env.example, copy its content into a new one with the name .env

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# build production
$ npm run build

# production mode
$ npm run start:prod
```

## Firebase

It should be noted that firebase only uses sdk to maintain authentication states. The data and the validations of the users are stored in the backend. With the firebase-admin library, a personalized token is generated which is sent to the client apps when a user authenticates, this is received by the client apps and saves the authentication status with firebase-sdk.

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).
