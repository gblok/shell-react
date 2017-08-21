class Socket {

    socket = null

    connect() {

        console.log('connect')
        this.socket = new Primus('/')

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