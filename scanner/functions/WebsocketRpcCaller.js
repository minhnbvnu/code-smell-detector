function WebsocketRpcCaller(eio_socket) {
    this._next_id = 0;
    this._rpc_callbacks = {};
    this._socket = eio_socket;

    this._rpc = this;
    this._namespace = '';
    this._namespaces = [];
}