const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, "src/client", "index.jsx"),
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
              test: /\.css$/i,
              include: path.resolve(__dirname, 'src/client'),
              use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
        ]
    },
    resolve: {
      extensions: ['.jsx', '.js','.ts'],
      modules: ['node_modules'],
    },
    plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/client", "index.html"),
    }),
    new NodePolyfillPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, './dist'),
    },
    proxy: {
      '/api': 'http://localhost:3000',
      secure: false
    }
  },
}