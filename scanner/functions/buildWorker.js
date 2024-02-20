function buildWorker(state, project, cancellationToken, writeFile2, getCustomTransformers, onlyReferences) {
            const buildOrder = getBuildOrderFor(state, project, onlyReferences);
            if (!buildOrder)
                return 3 /* InvalidProject_OutputsSkipped */;
            setupInitialBuild(state, cancellationToken);
            let reportQueue = true;
            let successfulProjects = 0;
            while (true) {
                const invalidatedProject = getNextInvalidatedProject(state, buildOrder, reportQueue);
                if (!invalidatedProject)
                    break;
                reportQueue = false;
                invalidatedProject.done(cancellationToken, writeFile2, getCustomTransformers == null ? void 0 : getCustomTransformers(invalidatedProject.project));
                if (!state.diagnostics.has(invalidatedProject.projectPath))
                    successfulProjects++;
            }
            disableCache(state);
            reportErrorSummary(state, buildOrder);
            startWatching(state, buildOrder);
            return isCircularBuildOrder(buildOrder) ? 4 /* ProjectReferenceCycle_OutputsSkipped */ : !buildOrder.some((p) => state.diagnostics.has(toResolvedConfigFilePath(state, p))) ? 0 /* Success */ : successfulProjects ? 2 /* DiagnosticsPresent_OutputsGenerated */ : 1 /* DiagnosticsPresent_OutputsSkipped */;
        }