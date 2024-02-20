function Sender(config) {
                this._buffer = [];
                this._lastSend = 0;
                this._config = config;
                this._sender = null;
                if (typeof XMLHttpRequest != "undefined") {
                    var testXhr = new XMLHttpRequest();
                    if ("withCredentials" in testXhr) {
                        this._sender = this._xhrSender;
                    }
                    else if (typeof XDomainRequest !== "undefined") {
                        this._sender = this._xdrSender;
                    }
                }
            }