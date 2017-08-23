import {Component, h} from '../../../shared/modules'

export default class extends Component {

    render() {

        let {field} = this.props,
            {val: value = null, label, validate = null, isInvalid, errors = null} = field,
            hint = isInvalid ? h('hint', {className: 'hint'}, errors ? errors.values().next().value : 'error') : null,
            onInput = e => {

                Reflect.set(field, 'val', e.target.value)

                if (validate)
                    validate()

                this.forceUpdate()
            },
            dom = h('label', {className: isInvalid ? 'invalid item' : 'item'}, [
                h('input', {
                    onInput,
                    type: 'text',
                    required: 'required',
                    autoComplete: 'off',
                    value
                }),
                h('.key', label),
                h('.bar'),
                hint
            ])


        return h('field', [dom])

    }
}