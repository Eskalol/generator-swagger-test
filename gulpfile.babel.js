import _ from 'lodash';
import gulp from 'gulp';
import nodemon from 'nodemon';
import eslint from 'gulp-eslint';
import babel from 'gulp-babel';

const paths = {
  scripts: [
    'src/api/**/*.js',
    'src/auth/**/*.js',
    'src/models/**/*.js',
    'src/config/**/*.js',
    'src/*.js'
  ],
  swagger: {
    config: 'src/config/default.yaml',
    spec: 'src/api/swagger/*.yaml'
  },
  test: 'src/test/**/*.js',
  dist: 'dist'
};

gulp.task('dev', () => {
    process.env.NODE_ENV = process.env.NODE_ENV || 'development';
    nodemon(`-w src src`);
});

gulp.task('lint', () => {
  return gulp.src(_.union(['src/**/*.js'], [`!${paths.test}`]))
    .pipe(eslint({
      configFile: '.eslintrc.js'
    }))
    .pipe(eslint.format());
});

gulp.task('lint:fix', () => {
  return gulp.src(_.union(['src/**/*.js'], [`!${paths.test}`]))
    .pipe(eslint({
      configFile: '.eslintrc.js',
      fix: true
    }))
    .pipe(eslint.format())
    .pipe(gulp.dest('./src'));
});

gulp.task('transpile', () => {
  return gulp.src(_.union(['src/**/*.js'], [`!${paths.test}`]))
    .pipe(babel({
      presets: {
        'es2015',
        'stage-0'
      },
      plugins: [
        'transform-runtime'
      ]
    }))
    .pipe(gulp.dest('dist'));
})
