import {h} from '../../modules'
import {ROUTE} from '../../actions/'

export default props => {

    let {message = null} = props,
        description = message
            ? null
            : h('description', [
                h('button', {onMouseDown: e => ROUTE('/products')}, [
                    `Check out products`,
                    h(Icon, {id: 'chevron-right'})
                ])
            ])

    if (!message)
        message = `Page not Found`


    return h('section', [
        h('error', [
                h('h1', message),
                description
            ]
        )
    ])
}