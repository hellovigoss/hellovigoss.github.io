let msg = {
    socket: null,
    peerSocketId: null,
    connect: (url) => {
        return new Promise(function (resolve, reject) {
            let socket = io(url)
            socket.on("connect", () => {
                msg.socket = socket
                resolve(socket)
            })
        })
    },
    listen: (cb) => {
        msg.socket.on("msg", (data) => {
            cb(msg.recv(data))
        })
    },
    pair: (socketid) => {
        if(msg.peerSocketId == null) {
            msg.peerSocketId = socketid
            msg.send("pair", {peerSocketId: msg.socket.id})
            console.log("pair request sent " + msg.socket.id + " " + msg.peerSocketId)
        }
    },
    send: (action, data) => {
        data.action = action
        data.socketid = msg.peerSocketId
        msg.socket.emit("msg", data)
        console.log("msg sent " + JSON.stringify(data) + " from " + msg.socket.id + " to " + msg.peerSocketId)
    },
    recv: (data) => {
        switch(data.action) {
            case "pair":
                msg.pair(data.peerSocketId)
            default:
                return data
        }
    }
}
export default msg