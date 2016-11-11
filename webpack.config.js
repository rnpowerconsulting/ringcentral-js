(function() {

    var webpack = require('webpack'),
        path = require('path');

    function createExternal(root, amd) {
        var ext = {};
        // if (cjs) ext['commonjs'] = cjs;
        // if (cjs) ext['commonjs2'] = cjs;
        if (amd) ext['amd'] = amd;
        if (root) ext['root'] = root;
        return ext;
    }

    module.exports = {

        context: __dirname,
        debug: true,
        devtool: '#source-map',
        target: 'web',

        entry: {
            'ringcentral.js': ['./src/SDK.js'],
            'ringcentral.min.js': ['./src/SDK.js']
        },

        externals: [
            {'es6-promise': true},
            {'fetch-ponyfill': true},
            {'pubnub': {amd: 'pubnub'}}
        ],

        output: {
            library: ['RingCentral', 'SDK'],
            libraryTarget: 'umd',
            path: __dirname + '/build',
            publicPath: '/build/',
            sourcePrefix: '',
            filename: "[name]",
            chunkFilename: "[id].chunk.js"
        },

        resolve: {
            extensions: ['', '.js'],
            alias: {
                'fetch-mock/es5/server': 'fetch-mock/es5/client'
            }
        },

        module: {
            loaders: [
                {test: /\.json$/, loader: 'json'}
            ]
        },

        node: {
            http: false,
            Buffer: false,
            process: false,
            timers: false
        },

        plugins: [
            // new webpack.optimize.UglifyJsPlugin({
            //     include: /\.min\.js$/,
            //     minimize: true
            // }),
            // new webpack.NormalModuleReplacementPlugin(/package\.json/, function(res){
            //     console.log(res);
            // }),
            // new webpack.DefinePlugin({
            //     VERSION: JSON.stringify(require('./package.json').version)
            // })
        ]

    };

})();