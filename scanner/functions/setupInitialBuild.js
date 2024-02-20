function setupInitialBuild(state, cancellationToken) {
            if (!state.allProjectBuildPending)
                return;
            state.allProjectBuildPending = false;
            if (state.options.watch)
                reportWatchStatus(state, Diagnostics.Starting_compilation_in_watch_mode);
            enableCache(state);
            const buildOrder = getBuildOrderFromAnyBuildOrder(getBuildOrder(state));
            buildOrder.forEach((configFileName) => state.projectPendingBuild.set(toResolvedConfigFilePath(state, configFileName), 0 /* None */));
            if (cancellationToken) {
                cancellationToken.throwIfCancellationRequested();
            }
        }