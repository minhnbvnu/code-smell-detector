function createInvalidatedProjectWithInfo(state, info, buildOrder) {
            verboseReportProjectStatus(state, info.project, info.status);
            return info.kind !== 2 /* UpdateOutputFileStamps */ ? createBuildOrUpdateInvalidedProject(info.kind, state, info.project, info.projectPath, info.projectIndex, info.config, buildOrder) : createUpdateOutputFileStampsProject(state, info.project, info.projectPath, info.config, buildOrder);
        }