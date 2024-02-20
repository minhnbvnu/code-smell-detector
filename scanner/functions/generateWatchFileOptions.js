function generateWatchFileOptions(watchFile3, fallbackPolling, options) {
                const defaultFallbackPolling = options == null ? void 0 : options.fallbackPolling;
                return {
                    watchFile: watchFile3,
                    fallbackPolling: defaultFallbackPolling === void 0 ? fallbackPolling : defaultFallbackPolling
                };
            }