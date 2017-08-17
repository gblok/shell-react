import {h} from '../../modules'
export default props => {
    let {className, id} = props
    return h('svg', {className}, [h('use', {xlinkHref: `#${id}`})])

}
