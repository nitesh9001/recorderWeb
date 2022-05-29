const path = require("path");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  // .BundleAnalyzerPlugin;
// const HWP = require("html-webpack-plugin");

module.exports = {
  entry: {
    RecorderWeb: "./src/index.js",
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index.js",
    library: "[name]",
    libraryTarget: "umd",
    libraryExport: "default",
    // umdNamedDefine: true,
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  node: {
    fs: "empty",
    __dirname: true,
  },
  // plugins: [new BundleAnalyzerPlugin()],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 512000,
              name: "svg/[hash]-[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  externals :{
      react: "react"
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  // plugins: [
  //   new HWP({
  //     template: path.join(__dirname, "/src/index.html"),
  //   }),
  // ],
};
