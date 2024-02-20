function getUpToDateStatus(state, project, resolvedPath) {
            if (project === void 0) {
                return { type: 0 /* Unbuildable */, reason: "File deleted mid-build" };
            }
            const prior = state.projectStatus.get(resolvedPath);
            if (prior !== void 0) {
                return prior;
            }
            mark("SolutionBuilder::beforeUpToDateCheck");
            const actual = getUpToDateStatusWorker(state, project, resolvedPath);
            mark("SolutionBuilder::afterUpToDateCheck");
            measure("SolutionBuilder::Up-to-date check", "SolutionBuilder::beforeUpToDateCheck", "SolutionBuilder::afterUpToDateCheck");
            state.projectStatus.set(resolvedPath, actual);
            return actual;
        }