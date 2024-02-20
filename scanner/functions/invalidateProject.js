function invalidateProject(state, resolved, reloadLevel) {
            if (state.host.getParsedCommandLine && reloadLevel === 1 /* Partial */) {
                reloadLevel = 2 /* Full */;
            }
            if (reloadLevel === 2 /* Full */) {
                state.configFileCache.delete(resolved);
                state.buildOrder = void 0;
            }
            state.needsSummary = true;
            clearProjectStatus(state, resolved);
            addProjToQueue(state, resolved, reloadLevel);
            enableCache(state);
        }