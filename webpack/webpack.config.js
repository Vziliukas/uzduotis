const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: __dirname,
    devtool: 'cheap-module-eval-source-map',
    entry: {
        browse: 'entries/browse.js',
        item: 'entries/item.js'
    },
    output: {
        path: path.join(__dirname, '..'),
        publicPath: '/bundle/',
        filename: '[name].js'
    },
    resolve: {
        root: path.resolve(__dirname + '/../app'),
        extensions: ['', '.js', '.jsx', '.css', '.scss']
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
              test: /\.png$/,
              loader: "url-loader?limit=100000"
            },
            {
              test: /\.jpg$/,
              loader: "file-loader"
            },
            {
              test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
              loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            {
              test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
              loader: 'url?limit=10000&mimetype=application/octet-stream'
            },
            {
              test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
              loader: 'file'
            },
            {
              test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
              loader: 'url?limit=10000&mimetype=image/svg+xml'
            },
            {
                test: /\.s?css$/,
                loaders: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            }
        ]
    },
    postcss: function () {
        return [require('autoprefixer'), require('precss')];
    },
    stats: { colors: true }
};
