function reportWatchStatus(state, message, ...args) {
            var _a2, _b;
            (_b = (_a2 = state.hostWithWatch).onWatchStatusChange) == null ? void 0 : _b.call(_a2, createCompilerDiagnostic(message, ...args), state.host.getNewLine(), state.baseCompilerOptions);
        }