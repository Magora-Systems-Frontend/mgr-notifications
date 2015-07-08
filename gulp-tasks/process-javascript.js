'use strict';

var gulp = require('gulp');
var jade = require('gulp-jade');
var templateCache = require('gulp-angular-templatecache');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var header = require('gulp-header');

var banner = '/* <%= pkg.name %> <%= pkg.version %> <%= pkg.homepage %> */\n';

module.exports = function (config, pkg) {

	gulp.task('compile-jade', function () {
		return gulp
			.src(config.src.jade)
			.pipe(jade())
			.pipe(gulp.dest(config.tmp.root));
	});

	gulp.task('compile-ng-templates', ['compile-jade'], function () {
		return gulp
			.src(config.tmp.html)
			.pipe(templateCache({
				module: config.package.name,
				filename: config.package.name + '.templates.js'
			}))
			.pipe(gulp.dest(config.tmp.root));
	});

	gulp.task('copy-js', function () {
		return gulp
			.src(config.src.js)
			.pipe(gulp.dest(config.tmp.root));
	});

	gulp.task('concat-js', ['copy-js', 'compile-ng-templates'], function () {
		return gulp
			.src(config.tmp.js)
			.pipe(concat(config.dist.filenames.js))
			.pipe(gulp.dest(config.tmp.root));
	});

	gulp.task('compress-js', ['concat-js'], function () {
		return gulp
			.src(config.tmp.root + config.dist.filenames.js)
			.pipe(uglify())
			.pipe(gulp.dest(config.tmp.root));
	});

	gulp.task('version-js', ['compress-js'], function () {
		return gulp
			.src(config.tmp.root + config.dist.filenames.js)
			.pipe(header(banner, { pkg: pkg }))
			.pipe(gulp.dest(config.dist.root));
	});

	gulp.task('process-javascript', [
		'copy-js',
		'compile-jade',
		'compile-ng-templates',
		'concat-js',
		'compress-js',
		'version-js'
	]);

	gulp.task('watch-javascript', function () {
		gulp.watch([config.src.js, config.src.jade], ['process-javascript']);
	});

};
