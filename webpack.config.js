var path = require('path');

module.exports = {
  entry: [
    './client/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
       
       {
        test: /\.js$/,
        include: [
          path.join(__dirname, 'client'),
          path.join(__dirname, 'server/shared')
        ],
        loaders: [ 'react-hot', 'babel' ]
      },
      {
          test: /\.css$/,
          include: [path.join(__dirname, 'client')
          ],
          loader: 'style-loader!css-loader'
       },
       {
          test: /\.scss$/,
          loader: 'style-loader!css-loader!sass-loader',
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.css', '.scss', '.json']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    inline: true
  },
  devtool: 'eval-source-map'
};