import {app$, Component, h, init} from '../../modules'
import {Header, Loader, Main} from '../../components'


export default class extends Component {

    state = {isInit: IS_SERVER}

    componentDidMount() {
        app$.observe(state => this.setState({...state}))
        init()
    }

    render() {

        let {isInit} = this.state,
            content = isInit
                ? [h(Header), h(Main)]
                : [h(Loader)]

        return h('shell', content)
    }
}