import {h} from './'

export const Formats = new Map([
    ['tag', (col, val) => h('tag', {className: val}, val)],
    ['multiTag', (col, val) => h('tags', val.map(v => h('tag', {className: v}, v)))]
])

