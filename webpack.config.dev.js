import path from 'path'
import webpack from 'webpack';

export default {
  devtools: 'cheap-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, '/client/index.js')
  ],
  output: {
    path: '/',
    publicPath: '/'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
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
       }
    ]
  },
  resolve: {
    extentions: [ '', '.js', '.css', '.scss', '.json' ]
  }
}
