import {h} from '../../modules'

export default props => {
    let {className = null, label} = props
    return h('tag', {className}, label)

}