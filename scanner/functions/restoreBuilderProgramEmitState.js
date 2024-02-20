function restoreBuilderProgramEmitState(state, savedEmitState) {
            state.affectedFilesPendingEmit = savedEmitState.affectedFilesPendingEmit;
            state.seenEmittedFiles = savedEmitState.seenEmittedFiles;
            state.programEmitPending = savedEmitState.programEmitPending;
            state.emitSignatures = savedEmitState.emitSignatures;
            state.outSignature = savedEmitState.outSignature;
            state.latestChangedDtsFile = savedEmitState.latestChangedDtsFile;
            state.hasChangedEmitSignature = savedEmitState.hasChangedEmitSignature;
            if (savedEmitState.changedFilesSet)
                state.changedFilesSet = savedEmitState.changedFilesSet;
        }