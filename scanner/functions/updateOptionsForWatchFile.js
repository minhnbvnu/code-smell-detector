function updateOptionsForWatchFile(options, useNonPollingWatchers2) {
                if (options && options.watchFile !== void 0)
                    return options;
                switch (tscWatchFile) {
                    case "PriorityPollingInterval":
                        return { watchFile: 1 /* PriorityPollingInterval */ };
                    case "DynamicPriorityPolling":
                        return { watchFile: 2 /* DynamicPriorityPolling */ };
                    case "UseFsEvents":
                        return generateWatchFileOptions(4 /* UseFsEvents */, 1 /* PriorityInterval */, options);
                    case "UseFsEventsWithFallbackDynamicPolling":
                        return generateWatchFileOptions(4 /* UseFsEvents */, 2 /* DynamicPriority */, options);
                    case "UseFsEventsOnParentDirectory":
                        useNonPollingWatchers2 = true;
                    default:
                        return useNonPollingWatchers2 ? (
                        // Use notifications from FS to watch with falling back to fs.watchFile
                        generateWatchFileOptions(5 /* UseFsEventsOnParentDirectory */, 1 /* PriorityInterval */, options)) : (
                        // Default to using fs events
                        { watchFile: 4 /* UseFsEvents */ });
                }
            }