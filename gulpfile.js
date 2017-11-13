'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minify = require('gulp-minifier');
var pug = require('gulp-pug');
var livereload = require('gulp-livereload');
var imagemin = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer');
var svgspriter = require('svgspriter');
var spritesmith = require('gulp.spritesmith');



gulp.task('all:watch', function () {
	livereload.listen();
	gulp.watch('stylesheets/scss/desktop/**/*.scss', ['compile:sass']);
	gulp.watch('stylesheets/scss/tablet/**/*.scss', ['compile:sass']);
	gulp.watch('stylesheets/scss/mobile/**/*.scss', ['compile:sass']);
	gulp.watch('stylesheets/css/concat.css', ['autoprefix']);
	gulp.watch('stylesheets/css/prefixed/concat.css', ['concat:css']);
	gulp.watch('js/files/**/*.js', ['concat:js']);
	gulp.watch('js/script.js', ['compress:js']);
	gulp.watch('views/**/*.pug', ['compile:pug']);
	gulp.watch('images_big/**/*', ['img:min']);
});

gulp.task('compile:sass', function () {
	return gulp.src('stylesheets/scss/concat/concat.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('stylesheets/css'));
});

gulp.task('concat:js', function () {
	return gulp.src('js/files/**/*.js')
		.pipe(concat('script.js'))
		.pipe(gulp.dest('js'))
		.pipe(livereload());
});

gulp.task('concat:css', function () {
	return gulp.src('stylesheets/css/prefixed/concat.css')
		.pipe(concat('style.css'))
		.pipe(gulp.dest('stylesheets'))
		.pipe(livereload());
});


gulp.task('compress:js', function () {
	return gulp.src('js/script.js')
		.pipe(minify({
			minify: true,
			collapseWhitespace: true,
			conservativeCollapse: true,
			minifyJS: true,

		}))
		.pipe(gulp.dest('js/min'))
		.pipe(livereload());
});

gulp.task('compile:pug', function buildHTML() {
	return gulp.src('views/templates/*.pug')
		.pipe(pug({

			pretty: true,

		})).pipe(gulp.dest(''))

});


gulp.task('img:min', function () {
	return gulp.src('images_big/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('images'))
});

gulp.task('autoprefix', function () {
	gulp.src('stylesheets/css/concat.css')
		.pipe(autoprefixer({}))
		.pipe(gulp.dest('stylesheets/css/prefixed/'))
});

gulp.task('svg', function() { 
	svgspriter.run("svg_files", "svg.html", "svg_preview.html"); });




gulp.task('default', []);
