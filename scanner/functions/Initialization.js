function Initialization(snippet) {
                snippet.queue = snippet.queue || [];
                var config = snippet.config || {};
                if (config && !config.instrumentationKey) {
                    config = snippet;
                    if (config["iKey"]) {
                        Microsoft.ApplicationInsights.Version = "0.10.0.0";
                        config.instrumentationKey = config["iKey"];
                    }
                    else if (config["applicationInsightsId"]) {
                        Microsoft.ApplicationInsights.Version = "0.7.2.0";
                        config.instrumentationKey = config["applicationInsightsId"];
                    }
                    else {
                        throw new Error("Cannot load Application Insights SDK, no instrumentationKey was provided.");
                    }
                }
                config = Initialization.getDefaultConfig(config);
                this.snippet = snippet;
                this.config = config;
            }