function traceIfEnabled(state, diagnostic, ...args) {
            if (state.traceEnabled) {
                trace(state.host, diagnostic, ...args);
            }
        }