import path from "path";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { Configuration, EnvironmentPlugin } from "webpack";

export default {
  target: "node",
  mode: "development",
  devtool: false,
  entry: path.resolve(__dirname, "src", "web-file-server.ts"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "web-file-server.js"
  },
  resolve: {
    extensions: [".ts", ".js"]
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
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new EnvironmentPlugin(["SERVE_DIR"]),
    new CleanWebpackPlugin({ verbose: true })
  ]
} satisfies Configuration;
