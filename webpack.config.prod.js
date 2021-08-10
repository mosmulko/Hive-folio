const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { extendDefaultPlugins } = require("svgo");

module.exports = {
  mode: "production",
  entry: {
    main: "./src/client/index.js",
    style: "./src/client/style.js",
    gallery: "./src/client/gallery.js",
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].js",
  },
  target: "web",
  devtool: "source-map",
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    runtimeChunk: "single",
  },
  resolve: {
    extensions: [".jsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
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
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset",
        generator: {
          filename: "img/[name][ext]",
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
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
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
};

// new ImageMinimizerPlugin({
//   minimizerOptions: {
//     // Lossless optimization with custom option
//     // Feel free to experiment with options for better result for you
//     plugins: [
//       ["gifsicle", { interlaced: true }],
//       ["jpegtran", { progressive: true }],
//       ["optipng", { optimizationLevel: 5 }],
//       // Svgo configuration here https://github.com/svg/svgo#configuration
//       [
//         "svgo",
//         {
//           plugins: extendDefaultPlugins([
//             {
//               name: "removeViewBox",
//               active: false,
//             },
//             {
//               name: "addAttributesToSVGElement",
//               params: {
//                 attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
//               },
//             },
//           ]),
//         },
//       ],
//     ],
//   },
// }),
