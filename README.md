# Tocco Client [![Build Status](https://travis-ci.org/tocco/tocco-client.svg?branch=master)](https://travis-ci.org/tocco/tocco-client) [![codecov](https://codecov.io/gh/tocco/tocco-client/branch/master/graph/badge.svg)](https://codecov.io/gh/tocco/tocco-client)

This repository contains the web client for the [Tocco Business Framework](https://www.tocco.ch).

This project is based on following technologies, tools and libraries:
* [React](https://facebook.github.io/react/)
* [Redux](https://github.com/reactjs/redux)
* [redux-saga](https://github.com/yelouafi/redux-saga)
* [npm](https://www.npmjs.com/)
* [webpack](https://webpack.github.io/)
* [Lerna](https://lernajs.io/)

Initial project structure is based on:
https://github.com/davezuko/react-redux-starter-kit.

## Project Structure
This project uses Lerna for package management.
The repository is maintained as [monorepo](https://github.com/babel/babel/blob/master/doc/design/monorepo.md).

Packages are located in folder ``packages/``. Every package maintains its own dependencies
and can be re-used in other packages.

### Package naming
* ``tocco-flow-...`` naming is used in ``package.json``; ``flow-...`` is used in folder structure
* ``tocco-action-...``

Please ensure that every package is prefixed with ``tocco-``

#### Package ``tocco-ui``
Package ``tocco-ui`` is a collection of reusable components. Components can be seen in action in the
[showcase-app deployed on GitHub](https://tocco.github.io/tocco-client/). Content of this page
is re-generated by Travis-CI on any change to packages ``tocco-ui`` or ``tocco-ui-showcase``.

## Documentation
Since this project heavily uses Redux and Sagas, you should be aware of it's concepts and also ES6.
A good starting point can be found in these docs:
* http://redux.js.org/
* https://medium.com/sons-of-javascript/javascript-an-introduction-to-es6-1819d0d89a0f
* https://davidwalsh.name/es6-generators

## Development

### Prerequisites
Run a Tocco Business Framework application with enabled REST API on:
http://localhost:8080

### Getting started
```
npm install --global lerna@v2.0.0-beta.30
npm run setup
lerna bootstrap
npm start --package={PACKAGE_NAME}
```
Open http://localhost:3000 and start coding!

#### Tests
Tests are using following tools and libraries:
* [Karma](https://karma-runner.github.io/)
* [Mocha](https://mochajs.org/)
* [Sinon](http://sinonjs.org/)
* [Chai](http://chaijs.com/)

All packages:
```
npm test
```

Single Package:
```
npm test --package={PACKAGE_NAME}
```

During development with watch:
```
npm run test:dev --package={PACKAGE_NAME}
```


## Publish bundle
Once the package is ready to publish, run following npm scripts. This registers the bundle
in the npm registry.

```
lerna publish
```

Only build:
```
npm run deploy:dev --package={PACKAGE_NAME}
npm run deploy:prod --package={PACKAGE_NAME}
```

## Linting
Eslint is used for linting. Linting will also be executed automatically on our CI.

```
npm run lint
```

And automatically fix issues:

```
npm run lint:fix
```

## Setup Linting with IntelliJ
- Install ESLint Plugin
- Settings (Preferences on OS X) | Languages & Frameworks | JavaScript |  Code Quality Tools --enable
- Settings (Preferences on OS X) | Editor | Inspections | Code style issues | Unterminated statement -- disable

## Git Commit Msg
Commit messages follow this convention:
http://karma-runner.github.io/0.10/dev/git-commit-msg.html