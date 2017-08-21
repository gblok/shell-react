import {app$, Component, h, init} from '../../modules'
import {Header, Loader, Main} from '../../components'
import {socket} from '../../modules/socket'

export default class extends Component {

    state = {isInit: IS_SERVER}

    componentDidMount() {

        app$.observe(state => this.setState({...state}))
        init()
        socket.connect()
    }

    render() {

        let {isInit} = this.state,
            content = isInit
                ? [h(Header), h(Main)]
                : [h(Loader)]

        return h('shell', content)
    }
}