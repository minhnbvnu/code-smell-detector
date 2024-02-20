function createSolutionBuilderHost(system = sys, createProgram2, reportDiagnostic, reportSolutionBuilderStatus, reportErrorSummary2) {
            const host = createSolutionBuilderHostBase(system, createProgram2, reportDiagnostic, reportSolutionBuilderStatus);
            host.reportErrorSummary = reportErrorSummary2;
            return host;
        }