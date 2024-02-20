function convertToDiagnostics(diagnostics, newProgram) {
            if (!diagnostics.length)
                return emptyArray;
            let buildInfoDirectory;
            return diagnostics.map((diagnostic) => {
                const result = convertToDiagnosticRelatedInformation(diagnostic, newProgram, toPath3);
                result.reportsUnnecessary = diagnostic.reportsUnnecessary;
                result.reportsDeprecated = diagnostic.reportDeprecated;
                result.source = diagnostic.source;
                result.skippedOn = diagnostic.skippedOn;
                const { relatedInformation } = diagnostic;
                result.relatedInformation = relatedInformation ? relatedInformation.length ? relatedInformation.map((r) => convertToDiagnosticRelatedInformation(r, newProgram, toPath3)) : [] : void 0;
                return result;
            });
            function toPath3(path) {
                buildInfoDirectory != null ? buildInfoDirectory : buildInfoDirectory = getDirectoryPath(getNormalizedAbsolutePath(getTsBuildInfoEmitOutputFilePath(newProgram.getCompilerOptions()), newProgram.getCurrentDirectory()));
                return toPath(path, buildInfoDirectory, newProgram.getCanonicalFileName);
            }
        }