
const browserify = require('browserify');
const clean = require("gulp-clean")
const gulp = require("gulp");
const path = require("path");
const source = require('vinyl-source-stream');
const tsCompile = require('typescript');
const ts = require('gulp-typescript');

const tsProject = ts.createProject("tsconfig.json");

const buildDir = "./build";
const tsOutputDir = path.join(buildDir, "tsOutput");
const distDir = path.join(buildDir, "dist");

function ts_compile() {
    return tsProject.src()
        .pipe(tsProject(ts.reporter.fullReporter()))
        .js
        .pipe(gulp.dest(tsOutputDir));
};

function copy_html() {
    return gulp.src("html/**/*")
        .pipe(gulp.dest(distDir));
}

function bundle() {
    return browserify(path.join(tsOutputDir, "app.js"))
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest(distDir));
}

function cleanBuildFiles() {
    return gulp.src(buildDir, {read: false})
        .pipe(clean());
}

exports.bundle = bundle;
exports.copy_html = copy_html;
exports.ts_compile = ts_compile;

exports.default = gulp.series(cleanBuildFiles, copy_html, ts_compile, bundle);