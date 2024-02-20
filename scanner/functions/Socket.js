function Socket(io, nsp, opts) {
            var _this;

            _classCallCheck(this, Socket);

            _this = _super.call(this);
            /**
             * Whether the socket is currently connected to the server.
             *
             * @example
             * const socket = io();
             *
             * socket.on("connect", () => {
             *   console.log(socket.connected); // true
             * });
             *
             * socket.on("disconnect", () => {
             *   console.log(socket.connected); // false
             * });
             */

            _this.connected = false;
            /**
             * Whether the connection state was recovered after a temporary disconnection. In that case, any missed packets will
             * be transmitted by the server.
             */

            _this.recovered = false;
            /**
             * Buffer for packets received before the CONNECT packet
             */

            _this.receiveBuffer = [];
            /**
             * Buffer for packets that will be sent once the socket is connected
             */

            _this.sendBuffer = [];
            /**
             * The queue of packets to be sent with retry in case of failure.
             *
             * Packets are sent one by one, each waiting for the server acknowledgement, in order to guarantee the delivery order.
             * @private
             */

            _this._queue = [];
            /**
             * A sequence to generate the ID of the {@link QueuedPacket}.
             * @private
             */

            _this._queueSeq = 0;
            _this.ids = 0;
            _this.acks = {};
            _this.flags = {};
            _this.io = io;
            _this.nsp = nsp;

            if (opts && opts.auth) {
                _this.auth = opts.auth;
            }

            _this._opts = _extends({}, opts);
            if (_this.io._autoConnect) _this.open();
            return _this;
        }