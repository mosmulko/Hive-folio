const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: [
      "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
      "./src/client/index.js",
    ],
    style: [
      "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
      "./src/client/style.js",
    ],
    gallery: [
      "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
      "./src/client/gallery.js",
    ],
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].js",
  },
  optimization: {
    runtimeChunk: "single",
  },
  target: "web",
  devtool: "source-map",
  devServer: {
    contentBase: "./dist",
    hot: true,
  },
  resolve: {
    extensions: [".jsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        // Loads the javacript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            //options: { minimize: true }
          },
        ],
      },
      {
        test: /\.ejs$/,
        use: {
          loader: "ejs-compiled-loader",
          options: {
            htmlmin: true,
            htmlminOptions: {
              removeComments: true,
            },
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        // use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "img/[name][ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/views/index.html",
      filename: "./views/index.html",
      excludeChunks: ["server", "gallery"],
      inject: "body",
    }),
    new HtmlWebPackPlugin({
      template: "./src/views/gallery.html",
      filename: "./views/gallery.html",
      excludeChunks: ["server", "main"],
      inject: "body",
    }),
    new HtmlWebPackPlugin({
      template: "!!ejs-compiled-loader!./src/views/gallery.ejs",
      filename: "./views/gallery.ejs",
      excludeChunks: ["server", "main"],
      inject: "body",
      templateParameters: {
        component: "<%- component %>",
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};

// new MiniCssExtractPlugin({
//   filename: "[name].css",
//   chunkFilename: "[id].css",
// }),
