function reportUnrecoverableDiagnostic(system, reportDiagnostic, diagnostic) {
            reportDiagnostic(diagnostic);
            system.exit(1 /* DiagnosticsPresent_OutputsSkipped */);
        }