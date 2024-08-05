import path from "path";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { Configuration, DefinePlugin, EnvironmentPlugin } from "webpack";

export default {
  target: "node",
  devtool: "inline-source-map",
  entry: path.resolve(__dirname, "src", "index.ts"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index.js"
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
    minimize: true
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new EnvironmentPlugin(["PORT", "SERVE_DIR"]),
    new CleanWebpackPlugin({ verbose: true })
  ]
} satisfies Configuration;
