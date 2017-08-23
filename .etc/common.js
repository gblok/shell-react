import webpack from 'webpack'
import LessCleanCSS from 'less-plugin-clean-css'
import LessPluginAutoPrefix from 'less-plugin-autoprefix'
import {exclude, output, svg, vendor, IS_CLIENT, IS_SERVER} from '../shared/config'
import BabiliPlugin from 'babili-webpack-plugin'

export const CommonLoaders = opts => [
    {
        test: /\.pug$/,
        exclude,
        use: [
            {loader: 'file-loader', options: {name: '[name].html'}},
            {loader: 'pug-loader'}
        ]
    },
    {
        test: /\.(es6|js|jsx)$/,
        exclude,
        use: {
            loader: 'babel-loader',
            options: {
                presets: [
                    //'flow',
                    ['env', {
                        //'modules': false,
                        'loose': true
                    }]
                ],
                cacheDirectory: 'tmp',
                plugins: [
                    'transform-decorators-legacy',
                    'transform-class-properties',
                    'transform-object-rest-spread'
                ]
            }
        }
    },
    {
        test: /\.svg$/,
        exclude,
        include: svg,
        use: [
            {loader: 'svg-sprite-loader'},
            {
                loader: 'svgo-loader',
                options: {
                    plugins: [
                        {removeXMLNS: true},
                        {removeTitle: true},
                        {convertColors: {shorthex: true}},
                        {convertPathData: true}
                    ]
                }
            }
        ]
    }
]

export const Common = env => {
    return {
        node: {fs: 'empty'},
        cache: true,
        context: process.cwd(),
        output: {
            path: output,
            filename: 'assets/js/[name].js',
            sourceMapFilename: '[file].map',
            libraryTarget: 'umd'
        },
        plugins: [
            new webpack.DllReferencePlugin({
                context: process.cwd(),
                manifest: require(vendor)
            }),
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false,
                sourceMap: false,
                options: {
                    lessPlugins: [
                        new LessCleanCSS({advanced: true}),
                        new LessPluginAutoPrefix({browsers: ['last 2 versions']})
                    ]
                },
            }),
            new webpack.DefinePlugin({
                IS_CLIENT,
                IS_SERVER,
                'process.env': {
                    'NODE_ENV': JSON.stringify(env || 'development')
                }
            }),

            new webpack.NoEmitOnErrorsPlugin(),
            new BabiliPlugin({removeConsole: 1, removeDebugger: 1}, {comments: 0}),
            new webpack.optimize.ModuleConcatenationPlugin

        ],
        resolve: {
            unsafeCache: true,
            extensions: ['.js', '.es6', '.jsx', '.pug', '.less', '.css', '.svg'],
            modules: ['node_modules']
        },
        resolveLoader: {
            modules: ['node_modules']
        }

    }
}