const path = require("path");
const webpack = require("webpack"); // plugins

module.exports = {
  // mode: defines el entorno para el cual estamos configurando el build  
  mode: "production",
  // entry: apuntas al archivo de entrada a la aplicación
  entry: "./src/index.js",
  // output: defines donde alojarás los archivos estáticos generados y puedes personalizar el nombre del archivo estático del js
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js",
  },
  // module rules: defines las configuraciones y reglas para la carga de las extensiones que tengan tus archivos
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(gif|png|jpe?g)$/i,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true,
              disable: true,
            }
          }
        ]
      }
    ],
  },
  // plugins: son características que me permiten darle soporte a mi configuracion con webpack
  plugins: [
    new webpack.ProvidePlugin({
      React: "react"
    })
  ],
  // resolve: es donde dejo registradas todas las extensiones que estoy resolviendo de cara al build
  resolve: {
    extensions: [".js", ".jsx"],
  },
  // me permite habilitar recomendaciones, manejo de errores, warnings, etc para añadir configuraciones y mejorar el build
  performance: {
    hints: process.env.NODE_ENV === "production" ? "error" : false,
    maxEntrypointSize: 580000,
    maxAssetSize: 580000,
  },
  //hot: true,
  // me permite crear y configurar un servidor proxy reverso para saber como se esta comportando mi proyecto
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8080",
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/api": "/api",
        }
      }
    },
    hot: true,
    static: path.resolve(__dirname, "public"),
  },
  // devtool: es el inspector de recomendaciones y errores en la generación del build
  devtool: "source-map",
};
