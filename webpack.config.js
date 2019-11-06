const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_module/,
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src")
    }
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://jsonplaceholder.typicode.com",
        pathRewrite: { "^/api": "" },
        changeOrigin: true,
        onProxyReq(proxyReq, req, res) {
          console.log("proxy request: ");
          console.dir(proxyReq);
          console.log("original request: ");
          console.dir(req);
        }
      }
    }
  }
};
