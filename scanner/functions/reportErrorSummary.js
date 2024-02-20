function reportErrorSummary(state, buildOrder) {
            if (!state.needsSummary)
                return;
            state.needsSummary = false;
            const canReportSummary = state.watch || !!state.host.reportErrorSummary;
            const { diagnostics } = state;
            let totalErrors = 0;
            let filesInError = [];
            if (isCircularBuildOrder(buildOrder)) {
                reportBuildQueue(state, buildOrder.buildOrder);
                reportErrors(state, buildOrder.circularDiagnostics);
                if (canReportSummary)
                    totalErrors += getErrorCountForSummary(buildOrder.circularDiagnostics);
                if (canReportSummary)
                    filesInError = [...filesInError, ...getFilesInErrorForSummary(buildOrder.circularDiagnostics)];
            }
            else {
                buildOrder.forEach((project) => {
                    const projectPath = toResolvedConfigFilePath(state, project);
                    if (!state.projectErrorsReported.has(projectPath)) {
                        reportErrors(state, diagnostics.get(projectPath) || emptyArray);
                    }
                });
                if (canReportSummary)
                    diagnostics.forEach((singleProjectErrors) => totalErrors += getErrorCountForSummary(singleProjectErrors));
                if (canReportSummary)
                    diagnostics.forEach((singleProjectErrors) => [...filesInError, ...getFilesInErrorForSummary(singleProjectErrors)]);
            }
            if (state.watch) {
                reportWatchStatus(state, getWatchErrorSummaryDiagnosticMessage(totalErrors), totalErrors);
            }
            else if (state.host.reportErrorSummary) {
                state.host.reportErrorSummary(totalErrors, filesInError);
            }
        }