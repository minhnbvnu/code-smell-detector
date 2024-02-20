function createUpdateOutputFileStampsProject(state, project, projectPath, config, buildOrder) {
            let updateOutputFileStampsPending = true;
            return {
                kind: 2 /* UpdateOutputFileStamps */,
                project,
                projectPath,
                buildOrder,
                getCompilerOptions: () => config.options,
                getCurrentDirectory: () => state.compilerHost.getCurrentDirectory(),
                updateOutputFileStatmps: () => {
                    updateOutputTimestamps(state, config, projectPath);
                    updateOutputFileStampsPending = false;
                },
                done: () => {
                    if (updateOutputFileStampsPending) {
                        updateOutputTimestamps(state, config, projectPath);
                    }
                    mark("SolutionBuilder::Timestamps only updates");
                    return doneInvalidatedProject(state, projectPath);
                }
            };
        }