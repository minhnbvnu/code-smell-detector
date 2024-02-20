function PageViewPerformance(name, url, durationMs, properties, measurements) {
                    _super.call(this);
                    this.aiDataContract = {
                        ver: true,
                        name: false,
                        url: false,
                        duration: false,
                        perfTotal: false,
                        networkConnect: false,
                        sentRequest: false,
                        receivedResponse: false,
                        domProcessing: false,
                        properties: false,
                        measurements: false
                    };
                    this.isValid = false;
                    var timing = PageViewPerformance.getPerformanceTiming();
                    if (timing) {
                        var total = PageViewPerformance.getDuration(timing.navigationStart, timing.loadEventEnd);
                        var network = PageViewPerformance.getDuration(timing.navigationStart, timing.connectEnd);
                        var request = PageViewPerformance.getDuration(timing.requestStart, timing.responseStart);
                        var response = PageViewPerformance.getDuration(timing.responseStart, timing.responseEnd);
                        var dom = PageViewPerformance.getDuration(timing.responseEnd, timing.loadEventEnd);
                        if (total == 0) {
                            ApplicationInsights._InternalLogging.throwInternalNonUserActionable(1 /* WARNING */, "error calculating page view performance: total='" + total + "', network='" + network + "', request='" + request + "', response='" + response + "', dom='" + dom + "'");
                        }
                        else if (total < Math.floor(network) + Math.floor(request) + Math.floor(response) + Math.floor(dom)) {
                            ApplicationInsights._InternalLogging.throwInternalNonUserActionable(1 /* WARNING */, "client performance math error:" + total + " < " + network + " + " + request + " + " + response + " + " + dom);
                        }
                        else {
                            durationMs = total;
                            this.perfTotal = ApplicationInsights.Util.msToTimeSpan(total);
                            this.networkConnect = ApplicationInsights.Util.msToTimeSpan(network);
                            this.sentRequest = ApplicationInsights.Util.msToTimeSpan(request);
                            this.receivedResponse = ApplicationInsights.Util.msToTimeSpan(response);
                            this.domProcessing = ApplicationInsights.Util.msToTimeSpan(dom);
                            this.isValid = true;
                        }
                    }
                    this.url = Telemetry.Common.DataSanitizer.sanitizeUrl(url);
                    this.name = Telemetry.Common.DataSanitizer.sanitizeString(name || ApplicationInsights.Util.NotSpecified);
                    if (!isNaN(durationMs)) {
                        this.duration = ApplicationInsights.Util.msToTimeSpan(durationMs);
                    }
                    this.properties = ApplicationInsights.Telemetry.Common.DataSanitizer.sanitizeProperties(properties);
                    this.measurements = ApplicationInsights.Telemetry.Common.DataSanitizer.sanitizeMeasurements(measurements);
                }