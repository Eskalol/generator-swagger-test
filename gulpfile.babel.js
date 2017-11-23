import _ from 'lodash';
import gulp from 'gulp';
import nodemon from 'nodemon';
import lazypipe from 'lazypipe';
import gulpLoadPlugins from 'gulp-load-plugins';
import eslint from 'gulp-eslint';

var plugins = gulpLoadPlugins();


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

let lintServerScripts = lazypipe()
    .pipe(plugins.eslint, '.eslintrc.js')
    .pipe(plugins.eslint.format);

gulp.task('dev', () => {
    process.env.NODE_ENV = process.env.NODE_ENV || 'development';
    // config = require(`./${serverPath}/config/environment`);
    nodemon(`-w src src`);
});

gulp.task('lint', () => {
  return gulp.src(_.union(['src/**/*.js'], [`!${paths.test}`]))
    .pipe(lintServerScripts());
});

gulp.task('lint:fix', () => {
  return gulp.src(_.union(paths.scripts, paths.test))
    .pipe(eslint({
      configFile: '.eslintrc.js',
      fix: true
    }))
    .pipe(eslint.format())
    .pipe(gulp.dest('./src'));
});
