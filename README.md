# autoloader

This module is an extension of the awesome [autoRequire](https://www.npmjs.com/package/auto-require) module. It provides some syntactical sugar and segregation of production and development environments.

Not all npm modules are capable of being autoloaded, as such this module hooks into global variable: `exModules` for compatibility exclusion.

Primary benefit is to avoid 10-15 lines of `require` and `const` declarations in every file across a project.

## Deployment

Quickstart overview of getting autoloader deployed. For full deployment and management information see the docs @ DOCCOWEBSITE

### Installing
```
npm i -P @tayloredtechnology/autoloader
```
### Global Variables
**autoLoader** works best if registering the following global variables on your entrypoint script
```
global.exModules = []		// list of modules that should be ignored from autoLoading
global.autoLoader = require('@tayloredtechnology/autoloader').general		// 'production' npm modules only
global.autoLoaderDev = require('@tayloredtechnology/autoloader').development	// 'development' npm modules only
```
`exModules` is the only true 'global' requirement, others can be loaded per-file but the central caching benefit may be sacrified

### Examples

```
# Production module:
$ = autoLoader('js-yaml')

# or
$ = autoLoader(['js-yaml', 'shelljs'])

# Using
$.jsYaml()
```
aliases can also be supplied
```
$ = autoLoader('shelljs', {sh: 'shelljs'})

# both are available for use
$.shelljs()
$.sh()
```

## Development

These instructions will get you a copy of the project up and running on your local machine for _development and testing_ purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* Node 6.12.x or higher (LTS when development commenced)
* [OneFlow CLI tool](https://www.npmjs.com/package/%40tayloredtechnology%2Foneflow) available in the repo, suggest using a global install with `npm i -g @tayloredtechnology/oneflow` for convenince
* [RedRun](https://www.npmjs.com/package/redrun) - optional but suggested

### Installing

A step by step series of examples that tell you how to get a development env running

```
git clone git@github.com:TayloredTechnology/autoloader.git
cd autoloader
npm install
```

## Running the tests

[TAP](https://testanything.org/) is used for all tests

```
# Execute all application tests
npm test
```

Code Coverage is provided by [CodeCov](https://codecov.io).

### And coding style tests

[XO](https://github.com/sindresorhus/xo) is used with [Prettier](https://github.com/prettier/prettier) for linting & code style.

```
npm run lint
```

## Built With

* [CodeCov](http://codecov.io/)
* [Conventional Commits](https://conventionalcommits.org)
* [I'm Done](https://imdone.io/)
* [Node @6.12.x](https://nodejs.org/docs/latest-v6.x/api/)
* [RenovateApp](http://renovateapp.com/)
* [SNYK](http://snyk.io/)
* [TestDouble](https://www.npmjs.com/package/testdouble)
* [Waffle Bot](https://help.waffle.io/wafflebot-basics/getting-started-with-the-wafflebot/how-to-use-wafflebot)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for the process for submitting pull requests to us. All contributors agree to follow and abide by this project's [Code of Merit (Conduct)](CONDUCT.md).

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/TayloredTechnology/autoloader/tags).

## Authors

* **Keidrych Anton-Oates** - _Initial work_ - [Taylored Technology](https://tayloredtechnology.net)

See also the list of [contributors](https://github.com/TayloredTechnology/autoloader/contributors) who participated in this project.

## License

This project is licensed under the Mozilla Public License Version 2.0 - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* NPM Community for consistenly making packages that accelerate development work
* [Test Anything Protocol](https://testanything.org/) for consistenly accelerating Feature Driven Design
