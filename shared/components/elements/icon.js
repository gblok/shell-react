import {h} from '../../modules'
export default props => h('svg', {className: 'icon'}, [h('use', {xlinkHref: `#${props.id}`})])
