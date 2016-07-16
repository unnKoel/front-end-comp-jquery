module.exports = function (config) {
  config.set({
    browsers: ['Chrome', 'IE'],
    frameworks: ['jasmine'],
    files: [
      'instrument/**/*.js',
      'test/**/*.spec.js'
    ]
  });
};