function createSolutionBuilderWorker(watch, hostOrHostWithWatch, rootNames, options, baseWatchOptions) {
            const state = createSolutionBuilderState(watch, hostOrHostWithWatch, rootNames, options, baseWatchOptions);
            return {
                build: (project, cancellationToken, writeFile2, getCustomTransformers) => build(state, project, cancellationToken, writeFile2, getCustomTransformers),
                clean: (project) => clean(state, project),
                buildReferences: (project, cancellationToken, writeFile2, getCustomTransformers) => build(state, project, cancellationToken, writeFile2, getCustomTransformers, 
                /*onlyReferences*/
                true),
                cleanReferences: (project) => clean(state, project, 
                /*onlyReferences*/
                true),
                getNextInvalidatedProject: (cancellationToken) => {
                    setupInitialBuild(state, cancellationToken);
                    return getNextInvalidatedProject(state, getBuildOrder(state), 
                    /*reportQueue*/
                    false);
                },
                getBuildOrder: () => getBuildOrder(state),
                getUpToDateStatusOfProject: (project) => {
                    const configFileName = resolveProjectName(state, project);
                    const configFilePath = toResolvedConfigFilePath(state, configFileName);
                    return getUpToDateStatus(state, parseConfigFile(state, configFileName, configFilePath), configFilePath);
                },
                invalidateProject: (configFilePath, reloadLevel) => invalidateProject(state, configFilePath, reloadLevel || 0 /* None */),
                close: () => stopWatching(state)
            };
        }