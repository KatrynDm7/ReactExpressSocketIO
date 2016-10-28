require('webpack');

module.exports = {
    entry: './public/javascripts/app.js',
    output: {
        path: __dirname + '/public/javascripts',
        filename: 'build.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel-loader?presets[]=react,presets[]=es2015'],
            }
        ]
    }
};
