var webpackConfig = require('./webpack.config');
var wallabyWebpack = require('wallaby-webpack');
var path = require('path');

module.exports = function (wallaby) {
  webpackConfig.resolve = {
    modules: [
      'node_modules',
      path.join(wallaby.projectCacheDir, 'src') // pointing to wallaby cache
    ],
    extensions: ['.js'] // removing .ts
  }

  // cleaning other things that are not required
  webpackConfig.plugins = [];
  webpackConfig.module.loaders = [];
  delete webpackConfig.module.preLoaders;

  var wallabyPostprocessor = wallabyWebpack(webpackConfig);

  return {
    files: [
      {pattern: 'src/**/*.ts', load: false},
      '!src/**/*spec.ts'

    ],

    tests: [
      {pattern: 'src/**/*spec.ts', load: false}
    ],

    postprocessor: wallabyPostprocessor,

    setup: function () {
      window.__moduleBundler.loadTests();
    },

    debug: true
  };
};