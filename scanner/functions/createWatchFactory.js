function createWatchFactory(host, options) {
            const watchLogLevel = host.trace ? options.extendedDiagnostics ? 2 /* Verbose */ : options.diagnostics ? 1 /* TriggerOnly */ : 0 /* None */ : 0 /* None */;
            const writeLog = watchLogLevel !== 0 /* None */ ? (s) => host.trace(s) : noop;
            const result = getWatchFactory(host, watchLogLevel, writeLog);
            result.writeLog = writeLog;
            return result;
        }