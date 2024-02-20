function getNextAffectedFilePendingEmit(state, emitOnlyDtsFiles) {
            var _a2;
            if (!((_a2 = state.affectedFilesPendingEmit) == null ? void 0 : _a2.size))
                return void 0;
            return forEachEntry(state.affectedFilesPendingEmit, (emitKind, path) => {
                var _a3;
                const affectedFile = state.program.getSourceFileByPath(path);
                if (!affectedFile || !sourceFileMayBeEmitted(affectedFile, state.program)) {
                    state.affectedFilesPendingEmit.delete(path);
                    return void 0;
                }
                const seenKind = (_a3 = state.seenEmittedFiles) == null ? void 0 : _a3.get(affectedFile.resolvedPath);
                let pendingKind = getPendingEmitKind(emitKind, seenKind);
                if (emitOnlyDtsFiles)
                    pendingKind = pendingKind & 24 /* AllDts */;
                if (pendingKind)
                    return { affectedFile, emitKind: pendingKind };
            });
        }