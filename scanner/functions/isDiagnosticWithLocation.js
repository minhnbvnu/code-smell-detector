function isDiagnosticWithLocation(diagnostic) {
            return diagnostic.file !== void 0 && diagnostic.start !== void 0 && diagnostic.length !== void 0;
        }