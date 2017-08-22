import {Common, CommonLoaders} from './common'
import {DEV_PORT, output, shared} from '../shared/config'


export default env => {

    return {
        ...Common(env),
        entry: {
            client: ['./client', './client/less/themes/default', './client/sprite'],
        },
        module: {
            loaders: [
                ...CommonLoaders(),
                {
                    test: /\.less$/,
                    exclude: /node_modules/,
                    include: /less/,
                    use: [

                        // {loader: 'file-loader', options: {name: '/assets/css/[name].css'}},
                        // {loader: 'less-loader', options: {paths: shared}}

                        {loader: 'style-loader'},
                        {loader: 'css-loader'},
                        {loader: 'less-loader', options: {paths: shared}}
                    ]
                }
            ]
        },
        devServer: {
            contentBase: output,
            compress: true,
            port: DEV_PORT,
            historyApiFallback: {index: 'shell.html'},
            allowedHosts: ['127.0.0.1',],
            proxy: [
                {'/api': 'http://localhost:8787'}
            ]
        }
    }
}

