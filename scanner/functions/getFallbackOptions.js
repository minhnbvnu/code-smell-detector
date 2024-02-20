function getFallbackOptions(options) {
            const fallbackPolling = options == null ? void 0 : options.fallbackPolling;
            return {
                watchFile: fallbackPolling !== void 0 ? fallbackPolling : 1 /* PriorityPollingInterval */
            };
        }