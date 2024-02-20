function ProxySocket(proxy_port, proxy_addr, meta, proxy_opts) {
    stream.Duplex.call(this);

    this.connected_fn = null;
    this.proxy_addr   = proxy_addr;
    this.proxy_port   = proxy_port;
    this.proxy_opts   = proxy_opts || {};

    this.setMeta(meta || {});

    this.state = 'disconnected';
}