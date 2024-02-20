function createStateBuildOrder(state) {
            const buildOrder = createBuildOrder(state, state.rootNames.map((f) => resolveProjectName(state, f)));
            state.resolvedConfigFilePaths.clear();
            const currentProjects = new Map(getBuildOrderFromAnyBuildOrder(buildOrder).map((resolved) => [toResolvedConfigFilePath(state, resolved), true]));
            const noopOnDelete = { onDeleteValue: noop };
            mutateMapSkippingNewValues(state.configFileCache, currentProjects, noopOnDelete);
            mutateMapSkippingNewValues(state.projectStatus, currentProjects, noopOnDelete);
            mutateMapSkippingNewValues(state.builderPrograms, currentProjects, noopOnDelete);
            mutateMapSkippingNewValues(state.diagnostics, currentProjects, noopOnDelete);
            mutateMapSkippingNewValues(state.projectPendingBuild, currentProjects, noopOnDelete);
            mutateMapSkippingNewValues(state.projectErrorsReported, currentProjects, noopOnDelete);
            mutateMapSkippingNewValues(state.buildInfoCache, currentProjects, noopOnDelete);
            mutateMapSkippingNewValues(state.outputTimeStamps, currentProjects, noopOnDelete);
            if (state.watch) {
                mutateMapSkippingNewValues(state.allWatchedConfigFiles, currentProjects, { onDeleteValue: closeFileWatcher });
                state.allWatchedExtendedConfigFiles.forEach((watcher) => {
                    watcher.projects.forEach((project) => {
                        if (!currentProjects.has(project)) {
                            watcher.projects.delete(project);
                        }
                    });
                    watcher.close();
                });
                mutateMapSkippingNewValues(state.allWatchedWildcardDirectories, currentProjects, { onDeleteValue: (existingMap) => existingMap.forEach(closeFileWatcherOf) });
                mutateMapSkippingNewValues(state.allWatchedInputFiles, currentProjects, { onDeleteValue: (existingMap) => existingMap.forEach(closeFileWatcher) });
                mutateMapSkippingNewValues(state.allWatchedPackageJsonFiles, currentProjects, { onDeleteValue: (existingMap) => existingMap.forEach(closeFileWatcher) });
            }
            return state.buildOrder = buildOrder;
        }