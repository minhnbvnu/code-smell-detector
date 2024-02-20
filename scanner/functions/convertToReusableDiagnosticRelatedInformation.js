function convertToReusableDiagnosticRelatedInformation(diagnostic, relativeToBuildInfo) {
            const { file } = diagnostic;
            return {
                ...diagnostic,
                file: file ? relativeToBuildInfo(file.resolvedPath) : void 0
            };
        }