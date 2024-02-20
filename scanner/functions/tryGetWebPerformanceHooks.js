function tryGetWebPerformanceHooks() {
            if (typeof performance === "object" && typeof PerformanceObserver === "function" && hasRequiredAPI(performance, PerformanceObserver)) {
                return {
                    // For now we always write native performance events when running in the browser. We may
                    // make this conditional in the future if we find that native web performance hooks
                    // in the browser also slow down compilation.
                    shouldWriteNativeEvents: true,
                    performance,
                    PerformanceObserver
                };
            }
        }