function addProjToQueue({ projectPendingBuild }, proj, reloadLevel) {
            const value = projectPendingBuild.get(proj);
            if (value === void 0) {
                projectPendingBuild.set(proj, reloadLevel);
            }
            else if (value < reloadLevel) {
                projectPendingBuild.set(proj, reloadLevel);
            }
        }