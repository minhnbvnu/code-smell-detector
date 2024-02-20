function removeFixIdIfFixAllUnavailable(registration, diagnostics) {
            const { errorCodes: errorCodes63 } = registration;
            let maybeFixableDiagnostics = 0;
            for (const diag2 of diagnostics) {
                if (contains(errorCodes63, diag2.code))
                    maybeFixableDiagnostics++;
                if (maybeFixableDiagnostics > 1)
                    break;
            }
            const fixAllUnavailable = maybeFixableDiagnostics < 2;
            return ({ fixId: fixId51, fixAllDescription, ...action }) => {
                return fixAllUnavailable ? action : { ...action, fixId: fixId51, fixAllDescription };
            };
        }