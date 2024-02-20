function getFixes(context) {
            const diagnostics = getDiagnostics(context);
            const registrations = errorCodeToFixes.get(String(context.errorCode));
            return flatMap(registrations, (f) => map(f.getCodeActions(context), removeFixIdIfFixAllUnavailable(f, diagnostics)));
        }