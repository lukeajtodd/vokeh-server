const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = [
  {
    mode: 'development',
    entry: [
      '@babel/polyfill',
      path.resolve(__dirname, 'src/index.js')
    ],

    target: 'node',

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/'
    },

    devtool: '#source-map',

    module: {
      rules: [
        {
          test: /\.(js)$/,
          loader: 'eslint-loader',
          enforce: 'pre',
          include: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'test')
          ],
          options: {
            formatter: require('eslint-friendly-formatter')
          }
        },
        {
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader'
        }
      ]
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },

    externals: [nodeExternals()],

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ]
  }
]
