import {Common, CommonLoaders} from './common'
import {modifyVars, shared} from '../shared/config'

export default env => {

    return {
        // watch:true,
        // stats: "detailed",
        node: {fs: 'empty'},
        performance: false,
        entry: {
            client: ['./client','./client/sprite'],
            themes: ['./client/less/themes/default']
        },
        module: {
            rules: [
                ...CommonLoaders({env}),
                {
                    test: /\.less$/,
                    exclude: /node_modules/,
                    use: [
                        {loader: 'file-loader', options: {name: '/assets/css/[name].css'}},
                        {
                            loader: 'less-loader', options: {
                            paths: shared,
                            modifyVars
                        }
                        }
                    ]
                },
            ]
        },
        ...Common(env)
    }
}
