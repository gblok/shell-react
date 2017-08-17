import {h} from '../../modules'
import {ROUTE} from '../../actions/'
import {Icon} from '../../components'

export default props => h('section', [
    h('success', [
            h('h1',`Welcome On Board`),
            h('description', [
                h('button', {onMouseDown: e => ROUTE('/products')}, [
                    `Check out products`,
                    h(Icon, {id: 'chevron-right'})
                ])
            ])
        ]
    )
])