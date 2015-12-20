# assemble [![NPM version](https://badge.fury.io/js/assemble.svg)](http://badge.fury.io/js/assemble)

> Static site generator for Grunt.js, Yeoman and Node.js. Used in projects like Zurb Foundation, Zurb Ink, H5BP/Effeckt, Less.js / lesscss.org, Topcoat, Web Experience Toolkit, and hundreds of other projects, to build sites, themes, components, documentation, blogs and gh-pages.

- [Install](#install)
- [Usage](#usage)
- [example assemblefile.js](#example-assemblefilejs)
- [API](#api)
- [Templates API](#templates-api)
- [File System API](#file-system-api)
  * [.src](#src)
  * [.dest](#dest)
  * [.copy](#copy)
  * [.symlink](#symlink)
- [Task API](#task-api)
  * [.task](#task)
  * [.build](#build)
  * [.watch](#watch)
- [Related projects](#related-projects)
- [Running tests](#running-tests)
- [Test coverage](#test-coverage)
- [Contributing](#contributing)
- [Author](#author)
- [License](#license)

## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i assemble --save
```

## Usage

```js
var assemble = require('assemble');
var app = assemble();
```

## example assemblefile.js

The following basic `assemblefile.js` that includes tasks for generating:

* `.html` files from `.hbs` ([handlebars](http://www.handlebarsjs.com/)) templates
* `.css` stylesheets from `.less` ([less](http://lesscss.org))

```js
var assemble = require('assemble');
var extname = require('gulp-extname');
var less = require('gulp-less');
var app = assemble();

app.task('html', function() {
  app.src('templates/*.hbs')
    .pipe(app.renderFile())
    .pipe(extname('.html'))
    .pipe(app.dest('dist/'));
});

app.task('css', function () {
  app.src('styles/*.less')
    .pipe(less())
    .pipe(app.dest('dist/assets/css'));
});

app.task('default', ['html', 'css']);
```

## API

### [Assemble](index.js#L23)

Create an `assemble` application. This is the main function exported by the assemble module.

**Params**

* `options` **{Object}**: Optionally pass default options to use.

**Example**

```js
var assemble = require('assemble');
var app = assemble();
```

## Templates API

Assemble has an extensive API for working with templates and template collections. In fact, the entire API from the [templates](https://github.com/jonschlinkert/templates) library is available on Assemble.

While we work on getting the assemble docs updated with these methods you can visit [the templates library](https://github.com/jonschlinkert/templates) to learn more about the full range of features and options.

***

## File System API

Assemble has the following methods for working with the file system:

* [src](#src)
* [dest](#dest)
* [copy](#copy)
* [symlink](#symlink)

Assemble has full [vinyl-fs](http://github.com/wearefractal/vinyl-fs) support, any [gulp](http://gulpjs.com) plugin should work with assemble.

### .src

Glob patterns or filepaths to source files.

**Params**

* `glob` **{String|Array}**: Glob patterns or file paths to source files.
* `options` **{Object}**: Options or locals to merge into the context and/or pass to `src` plugins

**Example**

```js
app.src('src/*.hbs', {layout: 'default'});
```

### .dest

Specify a destination for processed files.

**Params**

* `dest` **{String|Function}**: File path or rename function.
* `options` **{Object}**: Options and locals to pass to `dest` plugins

**Example**

```js
app.dest('dist/');
```

### .copy

Copy files with the given glob `patterns` to the specified `dest`.

**Params**

* `patterns` **{String|Array}**: Glob patterns of files to copy.
* `dest` **{String|Function}**: Desination directory.
* `returns` **{Stream}**: Stream, to continue processing if necessary.

**Example**

```js
app.task('assets', function(cb) {
  app.copy('assets/**', 'dist/')
    .on('error', cb)
    .on('finish', cb)
});
```

### .symlink

Glob patterns or paths for symlinks.

**Params**

* `glob` **{String|Array}**

**Example**

```js
app.symlink('src/**');
```

***

## Task API

Assemble has the following methods for running tasks and controlling workflows:

* [task](#task)
* [build](#build)
* [watch](#watch)

### .task

Define a task to be run when the task is called.

**Params**

* `name` **{String}**: Task name
* `fn` **{Function}**: function that is called when the task is run.

**Example**

```js
app.task('default', function() {
  app.src('templates/*.hbs')
    .pipe(app.dest('dist/'));
});
```

### .build

Run one or more tasks.

**Params**

* `tasks` **{Array|String}**: Task name or array of task names.
* `cb` **{Function}**: callback function that exposes `err`

**Example**

```js
app.build(['foo', 'bar'], function(err) {
  if (err) console.error('ERROR:', err);
});
```

### .watch

Watch files, run one or more tasks when a watched file changes.

**Params**

* `glob` **{String|Array}**: Filepaths or glob patterns.
* `tasks` **{Array}**: Task(s) to watch.

**Example**

```js
app.task('watch', function() {
  app.watch('docs/*.md', ['docs']);
});
```

## Related projects

Assemble is built on top of these great projects:

* [boilerplate](https://www.npmjs.com/package/boilerplate): Tools and conventions for authoring and publishing boilerplates that can be generated by any build… [more](https://www.npmjs.com/package/boilerplate) | [homepage](http://boilerplates.io)
* [composer](https://www.npmjs.com/package/composer): API-first task runner with three methods: task, run and watch. | [homepage](https://github.com/jonschlinkert/composer)
* [generate](https://www.npmjs.com/package/generate): Project generator, for node.js. | [homepage](https://github.com/generate/generate)
* [scaffold](https://www.npmjs.com/package/scaffold): Conventions and API for creating scaffolds that can by used by any build system or… [more](https://www.npmjs.com/package/scaffold) | [homepage](https://github.com/jonschlinkert/scaffold)
* [templates](https://www.npmjs.com/package/templates): System for creating and managing template collections, and rendering templates with any node.js template engine.… [more](https://www.npmjs.com/package/templates) | [homepage](https://github.com/jonschlinkert/templates)
* [verb](https://www.npmjs.com/package/verb): Documentation generator for GitHub projects. Verb is extremely powerful, easy to use, and is used… [more](https://www.npmjs.com/package/verb) | [homepage](https://github.com/verbose/verb)

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Test coverage

As of November 09, 2015:

```
Statements : 100% (38/38)
Branches   : 100% (8/8)
Functions  : 100% (10/10)
Lines      : 100% (38/38)
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/assemble/assemble/issues/new).

If Assemble doesn't do what you need, [please let us know][issue].

## Author

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2015 Jon Schlinkert
Released under the MIT license.

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on November 09, 2015._