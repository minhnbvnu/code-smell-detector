function TelemetryContext(config) {
                var _this = this;
                this._config = config;
                this._sender = new ApplicationInsights.Sender(config);
                if (typeof window !== 'undefined') {
                    this._sessionManager = new ApplicationInsights.Context._SessionManager(config, function (sessionState, timestamp) { return TelemetryContext._sessionHandler(_this, sessionState, timestamp); });
                    this.application = new ApplicationInsights.Context.Application();
                    this.device = new ApplicationInsights.Context.Device();
                    this.internal = new ApplicationInsights.Context.Internal();
                    this.location = new ApplicationInsights.Context.Location();
                    this.user = new ApplicationInsights.Context.User(config.accountId());
                    this.operation = new ApplicationInsights.Context.Operation();
                    this.session = new ApplicationInsights.Context.Session();
                    this.sample = new ApplicationInsights.Context.Sample(config.sampleRate());
                }
            }