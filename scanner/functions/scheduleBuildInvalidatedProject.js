function scheduleBuildInvalidatedProject(state, time, changeDetected) {
            const { hostWithWatch } = state;
            if (!hostWithWatch.setTimeout || !hostWithWatch.clearTimeout) {
                return;
            }
            if (state.timerToBuildInvalidatedProject) {
                hostWithWatch.clearTimeout(state.timerToBuildInvalidatedProject);
            }
            state.timerToBuildInvalidatedProject = hostWithWatch.setTimeout(buildNextInvalidatedProject, time, state, changeDetected);
        }