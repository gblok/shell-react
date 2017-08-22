import {IS_DEV} from '../config'

class Socket {

    socket = null

    connect() {

        console.log('connect', IS_DEV)
        this.socket = new Primus('//localhost:8787')

        this.events()

        console.log('connect', this.socket)
    }

    emit(event, data) {
        this.socket.emit(event, data)
    }

    write(value) {
        this.socket.write(value)
    }


    events() {

        const primus = this.socket

        primus.on('data', data => {
            console.log('Client', {data})
        })

        primus.on('hi', data => {

            console.log('hi', {data})

            // if (primus.reserved(data.args[0])) return

            // primus.emit.apply(primus, data.args)
        })


    }
}


export const socket = new Socket