function filterSemanticDiagnostics(diagnostic, option) {
            return filter(diagnostic, (d) => !d.skippedOn || !option[d.skippedOn]);
        }