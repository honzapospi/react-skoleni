module.exports = {
    entry: [
        './src/app.js'
    ],
    output: {
        path: __dirname+'/build',
        publicPath: '/build',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    devServer: {
        historyApiFallback: true
    }
};