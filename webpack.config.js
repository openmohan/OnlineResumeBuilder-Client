var combineLoaders = require('webpack-combine-loaders');
var path = require('path');
var webpack = require('webpack');


var config = {
   entry: './src/index.js',

   output: {
      path:'./',
      filename: 'build.js',
   },
   plugins: [
  new webpack.HotModuleReplacementPlugin()
],

devServer: {
    historyApiFallback: true,
    contentBase: './',
    hot: true
  },

   module: {
      loaders: [
        {
          test: /\.(js|jsx)$/,
       exclude: /node_modules/,
       loaders: ['react-hot', 'babel?presets[]=es2015,presets[]=react']
   },
         {
           test: /\.css$/,
           loader: combineLoaders([
             {
               loader: 'style-loader'
             }, {
               loader: 'css-loader',
               query: {
                 modules: true,
                 localIdentName: '[name]__[local]___[hash:base64:5]'
               }
             }
           ])
         }]

   }
}

module.exports = config;
