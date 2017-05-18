var path = require('path');


module.exports = {
  entry: {index:'./src/index.js'},
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public')
  },
  devServer:{
    publicPath:'/',
    contentBase:'./public',
  	inline:true,
  	port:8080,
    proxy:{
    '**':{
      target:'http://localhost:3000',
      pathRewrite:{
        '^/about':'/about'
        },
      changeOrigin:true,
      secure:false
      }
    }
  },

  module: {
  loaders: [
    { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader", 
		
    query:{presets:['react','es2015']}
	}
  ]
}
};