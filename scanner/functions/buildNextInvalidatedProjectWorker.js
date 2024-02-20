function buildNextInvalidatedProjectWorker(state, changeDetected) {
            state.timerToBuildInvalidatedProject = void 0;
            if (state.reportFileChangeDetected) {
                state.reportFileChangeDetected = false;
                state.projectErrorsReported.clear();
                reportWatchStatus(state, Diagnostics.File_change_detected_Starting_incremental_compilation);
            }
            let projectsBuilt = 0;
            const buildOrder = getBuildOrder(state);
            const invalidatedProject = getNextInvalidatedProject(state, buildOrder, 
            /*reportQueue*/
            false);
            if (invalidatedProject) {
                invalidatedProject.done();
                projectsBuilt++;
                while (state.projectPendingBuild.size) {
                    if (state.timerToBuildInvalidatedProject)
                        return;
                    const info = getNextInvalidatedProjectCreateInfo(state, buildOrder, 
                    /*reportQueue*/
                    false);
                    if (!info)
                        break;
                    if (info.kind !== 2 /* UpdateOutputFileStamps */ && (changeDetected || projectsBuilt === 5)) {
                        scheduleBuildInvalidatedProject(state, 100, 
                        /*changeDetected*/
                        false);
                        return;
                    }
                    const project = createInvalidatedProjectWithInfo(state, info, buildOrder);
                    project.done();
                    if (info.kind !== 2 /* UpdateOutputFileStamps */)
                        projectsBuilt++;
                }
            }
            disableCache(state);
            return buildOrder;
        }