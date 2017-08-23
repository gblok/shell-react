import isLength from 'validator/lib/isLength'


export const bindValidate = field => {


    let {validation = null} = field,
        rules = new Map

    if (validation)
        for (let rule of validation.split('|')) {
            let arg = rule.split(',')
            rules.set(arg.shift(), arg.length ? arg : true)
        }


    let validate = () => {


        Reflect.set(field, 'isInvalid', false)
        Reflect.set(field, 'errors', new Map)

        let {val = null, errors: fieldErrors, multi = null} = field


        if (rules.size && !multi) {

            for (let [rule, arg] of rules)
                if (!verify.get(rule)(val, arg)) {
                    Reflect.set(field, 'isInvalid', true)
                    fieldErrors.set(rule, errors.get(rule)(arg))
                }

            Reflect.set(field, 'errors', fieldErrors)
        }

        return !Reflect.get(field, 'isInvalid')
    }


    Reflect.set(field, 'validate', validate)

    return field
}


export const errors = new Map(
    [
        ['req', () => `This field is required`],
        ['min', ([min]) => `At least ${min} characters`],
        ['max', ([max]) => `You can enter up to ${max} characters`]
    ]
)

export const verify = new Map(
    [
        ['req', val => isLength(val, {min: 1})],
        ['min', (val, [min]) => isLength(val, {min})],
        ['max', (val, [max]) => isLength(val, {max})]
    ]
)