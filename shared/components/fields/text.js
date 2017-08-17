import {Component, h} from '../../../shared/modules'

export default class extends Component {

    render() {

        let {field} = this.props,
            {val: value = null, label} = field,
            onInput = e => {
                Reflect.set(field, 'val', e.target.value)
                field.validate()
                this.forceUpdate()
            },
            dom = h('label', {className: 'item'}, [
                h('input', {
                    onInput,
                    type: 'text',
                    required: 'required',
                    AutoComplete: 'off',
                    value
                }),
                h('.key', label),
                h('.bar')
            ])


        return h('field', [dom])

    }
}