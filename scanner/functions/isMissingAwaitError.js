function isMissingAwaitError(sourceFile, errorCode, span, cancellationToken, program) {
            const checker = program.getTypeChecker();
            const diagnostics = checker.getDiagnostics(sourceFile, cancellationToken);
            return some(diagnostics, ({ start, length: length2, relatedInformation, code }) => isNumber(start) && isNumber(length2) && textSpansEqual({ start, length: length2 }, span) && code === errorCode && !!relatedInformation && some(relatedInformation, (related) => related.code === Diagnostics.Did_you_forget_to_use_await.code));
        }