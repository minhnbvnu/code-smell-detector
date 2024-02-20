function createSolutionBuilderWithWatchHost(system = sys, createProgram2, reportDiagnostic, reportSolutionBuilderStatus, reportWatchStatus2) {
            const host = createSolutionBuilderHostBase(system, createProgram2, reportDiagnostic, reportSolutionBuilderStatus);
            const watchHost = createWatchHost(system, reportWatchStatus2);
            copyProperties(host, watchHost);
            return host;
        }