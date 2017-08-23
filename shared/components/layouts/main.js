import {h, router} from '../../modules'
import * as C from '../../components'
import {empty, isObject} from '../../modules/utils'


export default props => {

    let {current: {layout}, route} = router,
        Layouts = layout.map(tag => {

            let [tagName, tagOpts] = isObject(tag)
                ? [Object.keys(tag)[0], Object.values(tag)[0]]
                : [`Page${tag}`, empty]

            return Reflect.has(C, tagName)
                ? h(Reflect.get(C, tagName), {...props, ...tagOpts})
                : h('PageError', {message: `${tagName} component not found`})

        })

    return h('main', Layouts)

}
