'use strict';

var pkg = require('./bower.json');
var config = require('./gulp.config.json');

var gulp = require('gulp');
var bump = require('gulp-bump');
var connect = require('gulp-connect');

require('./gulp-tasks/clean.js')(config);
require('./gulp-tasks/process-stylesheets.js')(config, pkg);
require('./gulp-tasks/process-javascript.js')(config, pkg);

gulp.task('default', [
	'build',
	'serve',
	'watch'
]);

gulp.task('build', ['bump-version'], function () {
	return gulp.start([
		'clean',
		'process-stylesheets',
		'process-javascript'
	]);
});

gulp.task('serve', function () {
	connect.server({
		root: config.package.root,
		fallback: config.demo.root + config.demo.filenames.html,
		livereload: true
	});
});

gulp.task('watch', [
	'watch-demo',
	'watch-stylesheets',
	'watch-javascript'
]);

gulp.task('watch-demo', function () {
	gulp.watch(config.demo.js, function () { return gulp.src(config.demo.js).pipe(connect.reload()); });
	gulp.watch(config.demo.css, function () { return gulp.src(config.demo.css).pipe(connect.reload()); });
	gulp.watch(config.demo.html, function () { return gulp.src(config.demo.html).pipe(connect.reload()); });
});

gulp.task('bump-version', function () {
	return gulp
		.src(config.package.json)
		.pipe(bump())
		.pipe(gulp.dest(config.package.root));
});
