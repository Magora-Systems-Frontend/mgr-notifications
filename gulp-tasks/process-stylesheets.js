'use strict';

var gulp = require('gulp');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var header = require('gulp-header');

var banner = '/* <%= pkg.name %> <%= pkg.version %> <%= pkg.homepage %> */\n';

module.exports = function (config, pkg) {

	gulp.task('compile-stylus', function () {
		return gulp
			.src(config.src.styl)
			.pipe(stylus())
			.pipe(gulp.dest(config.tmp.root));
	});

	gulp.task('concat-css', ['compile-stylus'], function () {
		return gulp
			.src(config.tmp.css)
			.pipe(concat(config.dist.filenames.css))
			.pipe(gulp.dest(config.tmp.root));
	});

	gulp.task('compress-css', ['concat-css'], function () {
		return gulp
			.src(config.tmp.root + config.dist.filenames.css)
			.pipe(minifyCss())
			.pipe(gulp.dest(config.tmp.root));
	});

	gulp.task('version-css', ['compress-css'], function () {
		return gulp
			.src(config.tmp.root + config.dist.filenames.css)
			.pipe(header(banner, { pkg: pkg }))
			.pipe(gulp.dest(config.dist.root));
	});

	gulp.task('process-stylesheets', [
		'compile-stylus',
		'concat-css',
		'compress-css',
		'version-css'
	]);

	gulp.task('watch-stylesheets', function () {
		gulp.watch(config.src.styl, ['process-stylesheets']);
	});

};
