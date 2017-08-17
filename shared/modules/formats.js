import {h} from './'

export const Formats = new Map([
    ['tag', (col, val) =>h('tag', {className:val}, val)]
])