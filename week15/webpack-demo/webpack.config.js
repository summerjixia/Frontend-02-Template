const htmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    entry: "./list/main.js",
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: [['@babel/plugin-transform-react-jsx', { pragma: "createElement" }]]
                }
            }
        }]
    },
    plugins: [
        new htmlWebpackPlugin({ template: "./list/index.html" })
    ],
    mode: "development"
}