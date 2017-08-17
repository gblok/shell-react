export const isObject = val => {
    const type = typeof val
    return val != null && (type == 'object' || type == 'function')
}

export const empty = Object.create(null)
export const filterMeta = key => !['$loki', 'meta'].includes(key)
export const filterEsModule = j => Reflect.ownKeys(j).filter(k => k != '__esModule')

export const paginate = ({count, limit, offset = 0}) => {

    let res = null

    if (count && limit) {


        let total = Math.ceil(count / limit)


        res = {
            total,
            prev: null,
            active: null,
            next: null,
            pages: []
        }


        for (var i = 0; i < total; i++) {


            res.pages.push({
                idx: i,
                page: i + 1,
                offset: limit * i
            })

            if (offset === ( limit * i ))
                res.active = res.pages[i]
        }


        if (typeof res.pages[res.active.idx - 1] !== 'undefined')
            res.prev = res.pages[res.active.idx - 1]


        if (typeof res.pages[res.active.idx + 1] !== 'undefined')
            res.next = res.pages[res.active.idx + 1]


    }
    return res
}
export const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))
export const pipe = (...fns) => compose.apply(compose, fns.reverse())
export const guid = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`
}
export const dateOpts = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timezone: 'UTC'
}





