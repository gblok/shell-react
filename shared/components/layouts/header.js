import {h} from '../../modules'
import {ROUTE} from '../../actions'
import {socket} from '../../modules/socket'

export default props => h('header',
    [
        h('logo', {onMouseDown: e => ROUTE('/')}, [
            h('span', String.fromCharCode(9763)),
            h('abbr', `shell`)
        ]),
        h('button', {
            onClick: e => {
                socket.emit('data', `${Date.now()} emit`)
            }
        }, 'emit'),
        h('button', {
            onClick: e => {
                socket.write(`${Date.now()} write`)
            }
        }, 'write')
    ])