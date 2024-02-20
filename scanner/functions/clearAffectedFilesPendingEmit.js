function clearAffectedFilesPendingEmit(state, emitOnlyDtsFiles) {
            var _a2;
            if (!((_a2 = state.affectedFilesPendingEmit) == null ? void 0 : _a2.size))
                return;
            if (!emitOnlyDtsFiles)
                return state.affectedFilesPendingEmit = void 0;
            state.affectedFilesPendingEmit.forEach((emitKind, path) => {
                const pending = emitKind & 7 /* AllJs */;
                if (!pending)
                    state.affectedFilesPendingEmit.delete(path);
                else
                    state.affectedFilesPendingEmit.set(path, pending);
            });
        }