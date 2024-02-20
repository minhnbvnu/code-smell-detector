function addFileToChangeSet(state, path) {
            state.changedFilesSet.add(path);
            state.buildInfoEmitPending = true;
            state.programEmitPending = void 0;
        }