import webpack from 'webpack'
import {dll, output} from '../shared/config'

const {DllPlugin, DefinePlugin, LoaderOptionsPlugin, NoEmitOnErrorsPlugin, optimize: {ModuleConcatenationPlugin}} = webpack

exports.default = {
    node: {
        fs: 'empty',
        // console: false,
        // global: false,
        // process: false,
        // Buffer: false,
    },
    cache: true,
    context: process.cwd(),
    performance: false,
    mode: 'production',
    entry: {
        vendor: [
            '@babel/polyfill',
            'react',
            'react-dom',
            'react-hyperscript',
            'superagent',
            'eventemitter3',
            'lokijs',
            'most',
            'validator',
            'webfontloader',
            'page'
        ]
    },
    output: {
        filename: 'js/[name].js',
        path: output,
        library: '[name]',
        libraryTarget: 'umd'
    },
    plugins: [
        new DllPlugin({context: process.cwd(), path: dll, name: '[name]'}),
        new DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}}),
        new LoaderOptionsPlugin({minimize: true, debug: false}),
        new NoEmitOnErrorsPlugin,
        new ModuleConcatenationPlugin,
    ],
    resolve: {
        unsafeCache: true,
        extensions: ['.js', '.es6', '.jsx', '.less', '.svg'],
        modules: ['node_modules']
    },
    resolveLoader: {modules: ['node_modules']}
}