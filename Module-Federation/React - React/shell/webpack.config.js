const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = {
  output: {
    publicPath: "http://localhost:8082/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 8082,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "shell",
      filename: "remoteEntry.js",
      remotes: {Header: `promise new Promise(resolve => {
        const remoteUrl = 'http://localhost:8080/remoteEntry.js'
        const script = document.createElement('script')
        script.src = remoteUrl

        script.onload = () => {
          const proxy = {
            get: (request) => {
              return window.Header.get(request);
            },
            init: (arg) => {
              try {
                return window.Header.init(arg)
              } catch(e) {
                console.log('remote container already initialized')
              }
            }
          }
          resolve(proxy)
        }
        script.onerror = (error) => {
          console.error('error loading remote container')
          const proxy = {
            get: (request) => {
              return Promise.resolve(() => () => "Loading...");
            },
            init: (arg) => {
              return;
            }
          }
          resolve(proxy)
        }
        document.head.appendChild(script);
      })
      `},
      exposes: {},
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};
