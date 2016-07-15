/**
 * Created by common on 2016/7/15.
 */
var gulp = require('gulp');
var Server = require('karma').Server;

gulp.task('test', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('tdd', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js'
    }, done).start();
});

gulp.task('default', ['tdd']);