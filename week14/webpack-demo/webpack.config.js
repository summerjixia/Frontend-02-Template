const htmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    entry: "./gesture/test.js",
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
        new htmlWebpackPlugin({ template: "./gesture/index.html" })
    ],
    mode: "development"
}