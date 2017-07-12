import path from 'path'
import webpack from 'webpack';

export default {
  
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, '/client/index.js')
  ],
  output: {
    path: '/',
    publicPath: '/',
    filename: 'bundle.js'
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
       },
       {
          test: /\.scss$/,
          loader: 'style-loader!css-loader!sass-loader',
        }
    ]
  },
  resolve: {
    extentions: [ '', '.js', '.css', '.scss', '.json' ]
  },
  devtool: 'cheap-eval-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true
  },
}
