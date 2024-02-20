function handleAccept(info){
    if(info.socketId==this.socketId){
        var _tcp = chrome.sockets.tcp;
        var tcpSocket = new tcp();
        tcpSocket.socketId = info.clientSocketId;
        tcpSocket.keepAlive(true, 5, function(){
            _tcp.onReceive.addListener(function(info){
                if(info.socketId==tcpSocket.socketId){
                    tcpSocket.receive(info);
                }
            });
            _tcp.onReceiveError.addListener(function(info){
                if(info.socketId==tcpSocket.socketId){
                    tcpSocket.error(info.resultCode);
                }
            });
            tcpSocket.receive = handleRequest.bind(tcpSocket);
            tcpSocket.pause(false, function(){
                console.log('Receiving data...');
            });
        });
    }
}