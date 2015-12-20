'use strict';

var gulp = require('gulp');
var istanbul = require('gulp-istanbul');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var git = require('gulp-git');
var del = require('rimraf');

var lint = ['index.js', 'lib/*.js'];

function url(repo) {
  return 'https://github.com/' + repo;
}

gulp.task('coverage', function () {
  return gulp.src(lint)
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('mocha', ['coverage'], function () {
  return gulp.src('test/*.js')
    .pipe(mocha({reporter: 'spec'}))
    .pipe(istanbul.writeReports());
});

gulp.task('eslint', function () {
  return gulp.src(lint)
    .pipe(eslint())
});

gulp.task('spec', ['clone'], function (cb) {
  gulp.src('test/_spec/test/*.js')
    .pipe(mocha({reporter: 'spec'}))
    .on('end', function () {
      del('test/_spec', cb);
    });
});

gulp.task('clone', function(cb) {
  del('test/_spec', function (err) {
    if (err) return cb(err);
    git.clone(url('jonschlinkert/templates'), {
      args: 'test/_spec'
    }, cb);
  });
});

gulp.task('default', ['mocha', 'eslint']);
