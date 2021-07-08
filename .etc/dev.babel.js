import {Common, CommonLoaders} from './common'
import {DEV_PORT, output, shared} from '../shared/config'


export default env => {

    return {
        ...Common(env),
        mode:'development',
        entry: {
            client: ['./client', './client/less/themes/default', './client/sprite'],
        },
        module: {
            rules: [
                ...CommonLoaders(),
                {
                    test: /\.less$/,
                    exclude: /node_modules/,
                    include: /less/,
                    use: [
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
            proxy: {'/api': 'http://localhost:9191'}
        }
    }
}

