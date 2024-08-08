import path from "path";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { Configuration, EnvironmentPlugin } from "webpack";

export default {
  target: "node",
  devtool: "inline-source-map",
  entry: path.resolve(__dirname, "src", "index.ts"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index.js",
    libraryTarget: "commonjs2"
  },
  resolve: {
    extensions: [".ts", ".js"],
    fallback: {
      fs: false,
      path: false
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  optimization: {
    minimize: false
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new EnvironmentPlugin(["API_SERVER_PORT", "MEDIA_DIR"]),
    new CleanWebpackPlugin({ verbose: true })
  ]
} satisfies Configuration;
