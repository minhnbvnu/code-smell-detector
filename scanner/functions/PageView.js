function PageView(name, url, durationMs, properties, measurements) {
                    _super.call(this);
                    this.aiDataContract = {
                        ver: true,
                        name: false,
                        url: false,
                        duration: false,
                        properties: false,
                        measurements: false
                    };
                    this.url = Telemetry.Common.DataSanitizer.sanitizeUrl(url);
                    this.name = Telemetry.Common.DataSanitizer.sanitizeString(name || ApplicationInsights.Util.NotSpecified);
                    if (!isNaN(durationMs)) {
                        this.duration = ApplicationInsights.Util.msToTimeSpan(durationMs);
                    }
                    this.properties = ApplicationInsights.Telemetry.Common.DataSanitizer.sanitizeProperties(properties);
                    this.measurements = ApplicationInsights.Telemetry.Common.DataSanitizer.sanitizeMeasurements(measurements);
                }