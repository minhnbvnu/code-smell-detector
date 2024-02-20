function clearProjectStatus(state, resolved) {
            state.projectStatus.delete(resolved);
            state.diagnostics.delete(resolved);
        }