function convertToReusableDiagnostics(diagnostics, relativeToBuildInfo) {
            Debug.assert(!!diagnostics.length);
            return diagnostics.map((diagnostic) => {
                const result = convertToReusableDiagnosticRelatedInformation(diagnostic, relativeToBuildInfo);
                result.reportsUnnecessary = diagnostic.reportsUnnecessary;
                result.reportDeprecated = diagnostic.reportsDeprecated;
                result.source = diagnostic.source;
                result.skippedOn = diagnostic.skippedOn;
                const { relatedInformation } = diagnostic;
                result.relatedInformation = relatedInformation ? relatedInformation.length ? relatedInformation.map((r) => convertToReusableDiagnosticRelatedInformation(r, relativeToBuildInfo)) : [] : void 0;
                return result;
            });
        }