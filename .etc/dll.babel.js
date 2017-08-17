import webpack from 'webpack'
import BabiliPlugin from 'babili-webpack-plugin'
import {dll, output} from '../shared/config'

export default {
    node: {fs: 'empty'},
    cache: true,
    context: process.cwd(),
    performance: false,
    //profile: true,
    //stats: "verbose",
    //stats: "detailed",
    entry: {
        vendor: [
            'react',
            'react-dom',
            'react-hyperscript',
            'babel-polyfill',
            'superagent',
            'eventemitter2',
            'lokijs',
            'most',
            'validator',
            'webfontloader',
            'page'
        ],
    },
    output: {
        filename: 'assets/js/[name].js',
        path: output,
        library: '[name]',
        libraryTarget: 'umd'
    },
    plugins: [
        new webpack.DllPlugin({
            context: process.cwd(),
            path: dll,
            name: '[name]'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: true
        }),
        new BabiliPlugin({
            removeConsole: 1,
            removeDebugger: 1
        }, {comments: 0}),

        // new webpack.optimize.CommonsChunkPlugin({
        //     children: true,
        //     minChunks: 6
        // }),

        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin,

    ],
    resolve: {
        unsafeCache: true,
        extensions: ['.js', '.es6', '.jsx', '.pug', '.less', '.svg'],
        modules: ['node_modules']
    },
    resolveLoader: {
        modules: ['node_modules']
    }
}