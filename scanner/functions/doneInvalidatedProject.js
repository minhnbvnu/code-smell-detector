function doneInvalidatedProject(state, projectPath) {
            state.projectPendingBuild.delete(projectPath);
            return state.diagnostics.has(projectPath) ? 1 /* DiagnosticsPresent_OutputsSkipped */ : 0 /* Success */;
        }