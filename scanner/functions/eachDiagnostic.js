function eachDiagnostic(context, errorCodes63, cb) {
            for (const diag2 of getDiagnostics(context)) {
                if (contains(errorCodes63, diag2.code)) {
                    cb(diag2);
                }
            }
        }