function isTraceEnabled(compilerOptions, host) {
            return !!compilerOptions.traceResolution && host.trace !== void 0;
        }