function getBuildOrderFor(state, project, onlyReferences) {
            const resolvedProject = project && resolveProjectName(state, project);
            const buildOrderFromState = getBuildOrder(state);
            if (isCircularBuildOrder(buildOrderFromState))
                return buildOrderFromState;
            if (resolvedProject) {
                const projectPath = toResolvedConfigFilePath(state, resolvedProject);
                const projectIndex = findIndex(buildOrderFromState, (configFileName) => toResolvedConfigFilePath(state, configFileName) === projectPath);
                if (projectIndex === -1)
                    return void 0;
            }
            const buildOrder = resolvedProject ? createBuildOrder(state, [resolvedProject]) : buildOrderFromState;
            Debug.assert(!isCircularBuildOrder(buildOrder));
            Debug.assert(!onlyReferences || resolvedProject !== void 0);
            Debug.assert(!onlyReferences || buildOrder[buildOrder.length - 1] === resolvedProject);
            return onlyReferences ? buildOrder.slice(0, buildOrder.length - 1) : buildOrder;
        }