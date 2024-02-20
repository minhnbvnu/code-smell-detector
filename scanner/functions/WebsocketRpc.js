function WebsocketRpc(eio_socket) {
    var caller = new WebsocketRpcCaller(eio_socket);
    var ret = function WebsocketRpcInstance() {
        return ret.makeCall.apply(ret, arguments);
    };

    for(var prop in caller){
        ret[prop] = caller[prop];
    }

    ret._mixinEmitter();
    ret._bindSocketListeners();

    // Keep a reference to the main Rpc object so namespaces can find calling functions
    ret._rpc = ret;

    return ret;
}