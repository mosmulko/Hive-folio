const nodeExternals = require("webpack-node-externals");
const path = require("path");

module.exports = {
  name: "server",
  entry: {
    server: path.resolve(__dirname, "./server.js"),
  },
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  externals: [nodeExternals()],
  target: "node",
  node: {
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        options: {
          configFile: "config.server.json",
        },
      },
    ],
  },
};
