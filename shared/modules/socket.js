import {SOCKET_PORT, SOCKET_HOST} from '../config/server'

class Socket {

    socket = null

    connect() {

        console.log('connect')
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

        this.socket.on('data', function received(data) {
          console.log('Client', {data})
        })


    }
}


export const socket = new Socket