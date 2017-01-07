var gulp = require('gulp');
var runSequence = require('run-sequence');

// Add all standard tasks    
require('pip-webui-tasks').all(gulp);

// Define build tasks
gulp.task('build', function (callback) {
    runSequence('build-html-dev', ['build-bundle-dev', 'build-less-dev', 'build-lib', 'build-res'], 'build-dist', callback);
});

gulp.task('rebuild', function (callback) {
    runSequence('build-html-dev', ['build-bundle-dev', 'build-less-dev'], 'build-dist', callback);
});

gulp.task('clean', ['build-clean']);
gulp.task('watch', ['build-watch']);
gulp.task('lint', ['less-lint', 'js-lint']);
gulp.task('launch', ['app-launch']);

// Set default task
gulp.task('default', ['build']);