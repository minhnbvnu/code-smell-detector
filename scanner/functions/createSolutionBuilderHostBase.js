function createSolutionBuilderHostBase(system, createProgram2, reportDiagnostic, reportSolutionBuilderStatus) {
            const host = createProgramHost(system, createProgram2);
            host.getModifiedTime = system.getModifiedTime ? (path) => system.getModifiedTime(path) : returnUndefined;
            host.setModifiedTime = system.setModifiedTime ? (path, date) => system.setModifiedTime(path, date) : noop;
            host.deleteFile = system.deleteFile ? (path) => system.deleteFile(path) : noop;
            host.reportDiagnostic = reportDiagnostic || createDiagnosticReporter(system);
            host.reportSolutionBuilderStatus = reportSolutionBuilderStatus || createBuilderStatusReporter(system);
            host.now = maybeBind(system, system.now);
            return host;
        }