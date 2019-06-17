const gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync').create(),
	concat = require('gulp-concat'),
	cssnano = require('cssnano'),
	declarationSorter = require('css-declaration-sorter'),
	discardDuplicates = require('postcss-discard-duplicates'),
	discardEmpty = require('postcss-discard-empty'),
	discardOverridden = require('postcss-discard-overridden'),
	jshint = require('gulp-jshint'),
	mergeRules = require('postcss-merge-rules'),
	postcss = require('gulp-postcss'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	terser = require('gulp-terser');

const styleSrc = [
	'dev/assets/sass/styles.scss'
];

const scriptSrc = [
	'node_modules/scrollnav/dist/scrollnav.min.umd.js',
    'node_modules/popper.js/dist/umd/popper.js',
	'node_modules/tippy.js/umd/index.js',
	'dev/assets/js/*.js'
];

gulp.task('html', function () {
	return gulp.src('dev/**/*.html')
		.pipe(gulp.dest('build'))
		.pipe(browserSync.stream());
});

gulp.task('styles', function () {
	return gulp.src(styleSrc)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(postcss([
			cssnano(),
			declarationSorter(),
			discardDuplicates(),
			discardEmpty(),
			discardOverridden(),
			mergeRules()
		]))
		.pipe(autoprefixer({
			browsers: [ 'last 1 version' ]
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('./build/assets/css/'))
		.pipe(browserSync.stream());
});

gulp.task('scripts', function () {
	return gulp.src(scriptSrc)
		.pipe(jshint({ 
			asi: true,
			esversion: '6',
			expr: true,
			laxcomma: true,
			validthis: true
		}))
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(concat('scripts.js'))
		.pipe(terser())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('build/assets/js'))
		.pipe(browserSync.stream());
});


gulp.task('watch', function () {
	browserSync.init({
		server: './build'
	});
	gulp.watch([ 'dev/**/*.html' ], gulp.series('html'));
	gulp.watch([ 'dev/assets/sass/*.scss' ], gulp.series('styles'));
	gulp.watch([ 'dev/assets/js/*.js' ], gulp.series('scripts'));
	gulp.watch([ 'dev/*.html' ]).on('change', browserSync.reload);
});

gulp.task('default', gulp.series('html', 'styles', 'scripts', 'watch'));
