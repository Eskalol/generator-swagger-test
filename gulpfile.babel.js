import _ from 'lodash';
import del from 'del';
import gulp from 'gulp';
import nodemon from 'nodemon';
import runSequence from 'run-sequence';
import eslint from 'gulp-eslint';
import babel from 'gulp-babel';
import env from 'gulp-env';
import util from 'gulp-util';


const paths = {
  src: 'src',
  scripts: 'src/**/*.js',
  swagger: {
    config: 'src/config/default.yaml',
    spec: 'src/api/swagger/*.yaml'
  },
  test: 'src/test/**/*.js',
  dist: 'dist'
};

function onServerLog(log) {
    console.log(util.colors.white('[') +
        util.colors.yellow('nodemon') +
        util.colors.white('] ') +
        log.message);
}


/**
 * Serve
 */
gulp.task('serve:dist', cb => {
  runSequence(
    'build',
    'env:prod',
    'start:prod',
    cb);
});

gulp.task('serve', cb => {
  runSequence(
    'env:dev',
    'start:dev',
    cb);
});

/**
* Start servers
*/
gulp.task('start:dev', () => {
    nodemon(`-w ${paths.src} ${paths.src}`)
      .on('log', onServerLog);
});

gulp.task('start:prod', () => {
  nodemon(`-w ${paths.dist} ${paths.dist}`)
    .on('log', onServerLog);
});

/**
 * Env
 */
gulp.task('env:dev', () => {
  env({
    vars: { NODE_ENV: 'development' }
  });
});

gulp.task('env:test', () => {
  env({
    vars: { NODE_ENV: 'test' }
  });
});

gulp.task('env:prod', () => {
  env({
    vars: { NODE_ENV: 'production' }
  });
});

/**
 * Linting
 */

gulp.task('lint', () => {
  return gulp.src(_.union([`${paths.scripts}`], [`!${paths.test}`]))
    .pipe(eslint({
      configFile: '.eslintrc.js'
    }))
    .pipe(eslint.format());
});

gulp.task('lint:fix', () => {
  return gulp.src(_.union([`${paths.scripts}`], [`!${paths.test}`]))
    .pipe(eslint({
      configFile: '.eslintrc.js',
      fix: true
    }))
    .pipe(eslint.format())
    .pipe(gulp.dest('./src'));
});

/**
 * Build
 */

gulp.task('build', cb => {
  runSequence(
      'clean:dist',
      'transpile',
      'copy:yaml',
      cb);
});

gulp.task('transpile', () => {
  return gulp.src(_.union([`${paths.scripts}`], [`!${paths.test}`]))
    .pipe(babel({
      presets: [
        'es2015',
        'stage-0'
      ],
      plugins: [
        'transform-runtime'
      ]
    }))
    .pipe(gulp.dest(`${paths.dist}`));
});

gulp.task('copy:yaml', () => {
  return gulp.src('src/**/*.yaml')
    .pipe(gulp.dest(`${paths.dist}`));
});

gulp.task('clean:dist', () => del([`${paths.dist}/!(.git*|.openshift|Procfile)**`], {dot: true}));
