import request from 'superagent'


const headers = Object.create(null),
    _pending = new Set


const URI = tx => {

   //console.log({tx})

    let {cid} = tx
    return `/api/${cid}`
}


export const fetch = async tx => {



   // console.log('fetch', {tx})

    let {
        method = 'get',
        uri = null,
        formData = null
    } = tx

    uri = uri ?  uri : URI(tx)




    return _pending.has(uri)
        ? null
        : (
            _pending.add(uri),
                await request[method](uri)
                    .set('Accept','application/json')
                    .send({...formData})
                    .then(res => {
                        _pending.delete(uri)
                        return res.body
                    })
                    .catch(console.error)
        )


}

