var nodeExternals = require('webpack-node-externals');
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

/* helper function to get into build directory */
var distPath = function(name) {
  if ( undefined === name ) {
    return path.join('dist');
  }

  return path.join('dist', name);
}

var webpack_opts = {
  entry: './src/main.ts',
  target: 'node',
  devtool: 'source-map',
  output: {
    filename: distPath('dist.js'),
    libraryTarget: "commonjs2",
    devtoolModuleFilenameTemplate        : '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [
      'node_modules',
      'src',
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        test: /\.ts$/,
        ts: {
          compiler: 'typescript',
          configFileName: 'tsconfig.json'
        },
        tslint: {
          emitErrors: true,
          failOnHint: true
        }
      }
    })
  ],
  module: {
    loaders: [{ test: /\.ts$/, loaders: ['babel-loader', 'awesome-typescript-loader'] }],
    preLoaders: [ { test: /\.ts$/, loader: "tslint" } ]
  },
  externals: [nodeExternals()]
}

module.exports = webpack_opts;