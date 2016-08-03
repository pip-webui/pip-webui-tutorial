var gulp = require('gulp');

// Add all standard tasks    
require('pip-webui-tasks').all();

// Define build tasks        
gulp.task('build', ['build-dev', 'build-prod']);
gulp.task('rebuild', ['build-dev']);
gulp.task('clean', ['build-clean']);

// Set default task
gulp.task('default', ['build']);