function AppInsights(config) {
                var _this = this;
                this.config = config || {};
                var defaults = AppInsights.defaultConfig;
                if (defaults !== undefined) {
                    for (var field in defaults) {
                        if (this.config[field] === undefined) {
                            this.config[field] = defaults[field];
                        }
                    }
                }
                ApplicationInsights._InternalLogging.verboseLogging = function () { return _this.config.verboseLogging; };
                ApplicationInsights._InternalLogging.enableDebugExceptions = function () { return _this.config.enableDebug; };
                var configGetters = {
                    instrumentationKey: function () { return _this.config.instrumentationKey; },
                    accountId: function () { return _this.config.accountId; },
                    appUserId: function () { return _this.config.appUserId; },
                    sessionRenewalMs: function () { return _this.config.sessionRenewalMs; },
                    sessionExpirationMs: function () { return _this.config.sessionExpirationMs; },
                    endpointUrl: function () { return _this.config.endpointUrl; },
                    emitLineDelimitedJson: function () { return _this.config.emitLineDelimitedJson; },
                    maxBatchSizeInBytes: function () { return _this.config.maxBatchSizeInBytes; },
                    maxBatchInterval: function () { return _this.config.maxBatchInterval; },
                    disableTelemetry: function () { return _this.config.disableTelemetry; },
                    sampleRate: function () { return _this.config.samplingPercentage; }
                };
                this.context = new ApplicationInsights.TelemetryContext(configGetters);
                this._eventTracking = new Timing("trackEvent");
                this._eventTracking.action = function (name, url, duration, properties, measurements) {
                    var event = new ApplicationInsights.Telemetry.Event(name, properties, measurements);
                    var data = new ApplicationInsights.Telemetry.Common.Data(ApplicationInsights.Telemetry.Event.dataType, event);
                    var envelope = new ApplicationInsights.Telemetry.Common.Envelope(data, ApplicationInsights.Telemetry.Event.envelopeType);
                    _this.context.track(envelope);
                };
                this._pageTracking = new Timing("trackPageView");
                this._pageTracking.action = function (name, url, duration, properties, measurements) {
                    _this.sendPageViewInternal(name, url, duration, properties, measurements);
                };
                this._pageVisitTimeManager = new ApplicationInsights.Telemetry.PageVisitTimeManager(function (pageName, pageUrl, pageVisitTime) { return _this.trackPageVisitTime(pageName, pageUrl, pageVisitTime); });
            }