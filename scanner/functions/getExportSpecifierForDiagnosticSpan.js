function getExportSpecifierForDiagnosticSpan(span, sourceFile) {
            return tryCast(getTokenAtPosition(sourceFile, span.start).parent, isExportSpecifier);
        }