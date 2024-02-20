function createWatchHost(system = sys, reportWatchStatus2) {
            const onWatchStatusChange = reportWatchStatus2 || createWatchStatusReporter(system);
            return {
                onWatchStatusChange,
                watchFile: maybeBind(system, system.watchFile) || returnNoopFileWatcher,
                watchDirectory: maybeBind(system, system.watchDirectory) || returnNoopFileWatcher,
                setTimeout: maybeBind(system, system.setTimeout) || noop,
                clearTimeout: maybeBind(system, system.clearTimeout) || noop
            };
        }