const nodeExternals = require("webpack-node-externals");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    client: "./src/client/client.js",
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: "/",
  },
  resolve: {
    extensions: [".jsx", ".js"],
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./src/views", to: "views" },
        { from: "./public", to: "public" },
      ],
    }),
  ],
};
