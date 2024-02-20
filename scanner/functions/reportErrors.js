function reportErrors({ host }, errors) {
            errors.forEach((err) => host.reportDiagnostic(err));
        }