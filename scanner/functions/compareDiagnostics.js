function compareDiagnostics(d1, d2) {
            return compareDiagnosticsSkipRelatedInformation(d1, d2) || compareRelatedInformation(d1, d2) || 0 /* EqualTo */;
        }