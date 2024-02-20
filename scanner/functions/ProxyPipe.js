function ProxyPipe(kiwi_socket, proxy_server) {
    debug('[KiwiProxy] New Kiwi connection');

    this.kiwi_socket  = kiwi_socket;
    this.proxy_server = proxy_server;
    this.irc_socket   = null;
    this.buffers      = [];
    this.meta         = null;

    kiwi_socket.on('readable', this.kiwiSocketOnReadable.bind(this));
}