function RedisStorage (options) {
    Storage.call(this);
    this.options = options;
    this._host = null; // will be set by the Host
    this.redis = options.redis;
    this.redisConnectParams = options.redisConnectParams || {
        unixSocket: undefined,
        port: 6379,
        host: '127.0.0.1',
        options: {}
    };
    this.db = null;
    this.logtails = {};
}