function updateOptionsForWatchDirectory(options) {
                if (options && options.watchDirectory !== void 0)
                    return options;
                switch (tscWatchDirectory) {
                    case "RecursiveDirectoryUsingFsWatchFile":
                        return { watchDirectory: 1 /* FixedPollingInterval */ };
                    case "RecursiveDirectoryUsingDynamicPriorityPolling":
                        return { watchDirectory: 2 /* DynamicPriorityPolling */ };
                    default:
                        const defaultFallbackPolling = options == null ? void 0 : options.fallbackPolling;
                        return {
                            watchDirectory: 0 /* UseFsEvents */,
                            fallbackPolling: defaultFallbackPolling !== void 0 ? defaultFallbackPolling : void 0
                        };
                }
            }