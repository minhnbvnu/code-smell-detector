function invalidateProjectAndScheduleBuilds(state, resolvedPath, reloadLevel) {
            state.reportFileChangeDetected = true;
            invalidateProject(state, resolvedPath, reloadLevel);
            scheduleBuildInvalidatedProject(state, 250, 
            /*changeDetected*/
            true);
        }