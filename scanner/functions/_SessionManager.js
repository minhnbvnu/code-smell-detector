function _SessionManager(config, sessionHandler) {
                    if (!config) {
                        config = {};
                    }
                    if (!(typeof config.sessionExpirationMs === "function")) {
                        config.sessionExpirationMs = function () { return _SessionManager.acquisitionSpan; };
                    }
                    if (!(typeof config.sessionRenewalMs === "function")) {
                        config.sessionRenewalMs = function () { return _SessionManager.renewalSpan; };
                    }
                    this.config = config;
                    this._sessionHandler = sessionHandler;
                    this.automaticSession = new Session();
                }