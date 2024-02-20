function backupBuilderProgramEmitState(state) {
            const outFilePath = outFile(state.compilerOptions);
            Debug.assert(!state.changedFilesSet.size || outFilePath);
            return {
                affectedFilesPendingEmit: state.affectedFilesPendingEmit && new Map(state.affectedFilesPendingEmit),
                seenEmittedFiles: state.seenEmittedFiles && new Map(state.seenEmittedFiles),
                programEmitPending: state.programEmitPending,
                emitSignatures: state.emitSignatures && new Map(state.emitSignatures),
                outSignature: state.outSignature,
                latestChangedDtsFile: state.latestChangedDtsFile,
                hasChangedEmitSignature: state.hasChangedEmitSignature,
                changedFilesSet: outFilePath ? new Set(state.changedFilesSet) : void 0
            };
        }