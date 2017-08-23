import isLength from 'validator/lib/isLength'
import isAlphanumeric from 'validator/lib/isAlphanumeric'

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


        if (rules.size) {

            for (let [rule, arg] of rules) {

                if (multi) {

                    if(!val.size){
                        console.log('not req')
                        Reflect.set(field, 'isInvalid', true)
                        fieldErrors.set(rule, errors.get('req')())
                    }


                    for (let v of val)
                        if (!verify.get(rule)(v, arg)) {
                            Reflect.set(field, 'isInvalid', true)
                            fieldErrors.set(rule, errors.get(rule)(arg))
                        }


                } else {

                    if (!verify.get(rule)(val, arg)) {
                        Reflect.set(field, 'isInvalid', true)
                        fieldErrors.set(rule, errors.get(rule)(arg))
                    }
                }

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
        ['req', () => `is required`],
        ['min', ([min]) => `is too short (Min. ${min} characters required)`],
        ['max', ([max]) => `is too long (Max. ${max} characters allowed)`],
        ['isAlphaNumeric',() => `may only contain alpha-numeric characters`],
    ]
)

export const verify = new Map(
    [
        ['req', val => isLength(val, {min: 1})],
        ['min', (val, [min]) => isLength(val, {min})],
        ['max', (val, [max]) => isLength(val, {max})],
        ['isAlphaNumeric',(val, [locale]) => isAlphanumeric(val, locale)],
    ]
)
