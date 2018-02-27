# generator-swagger-test
[![dependencies Status][daviddm-image]][daviddm-url] [![devDependencies Status][daviddm-dev-image]][daviddm-dev-url] [![codecov][codecov-image]][codecov-url] [![Build Status][travis-image]][travis-url] [![AppVeyor][appveyor-image]][appveyor-url]


## Development setup
```bash
$ npm install -g gulp
$ git clone https://github.com/Eskalol/generator-swagger-test
$ mongod
$ gulp
```

## Gulp Tasks:
- Run `gulp` to serve:dev and run swagger editor.
- Run `gulp test` to run unit tests with mocha.
- Run `gulp build` to build dist.
- Run `gulp serve:dist` to serve production.
- Run `gulp serve` to serve development.
- Run `gulp clean:dist` to clean dist folder.
- Run `gulp swagger` to run swagger editor.
- Run `gulp lint` to run linting.
- Run `gulp lint:fix` to fix fixable errors.


## Whale it, you'll nail it!
```bash
$ docker-compose up
```


[daviddm-image]: http://img.shields.io/david/.svg?style=flat-square
[daviddm-url]: https://david-dm.org/
[daviddm-dev-url]: https://david-dm.org/?type=dev
[daviddm-dev-image]: https://img.shields.io/david/dev/.svg?style=flat-square

[appveyor-image]: https://img.shields.io/appveyor/ci/.svg?style=flat-square&logo=appveyor
[appveyor-url]: https://ci.appveyor.com/project/


[travis-image]: https://img.shields.io/travis/.svg?style=flat-square
[travis-url]: https://travis-ci.org/
[codecov-url]: https://codecov.io/gh/
[codecov-image]: https://img.shields.io/codecov/c/github/.svg?style=flat-square

