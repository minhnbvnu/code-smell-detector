function getStringLiteralCompletionDetails(name, sourceFile, position, contextToken, checker, options, host, cancellationToken, preferences) {
            if (!contextToken || !isStringLiteralLike(contextToken))
                return void 0;
            const completions = getStringLiteralCompletionEntries(sourceFile, contextToken, position, checker, options, host, preferences);
            return completions && stringLiteralCompletionDetails(name, contextToken, completions, sourceFile, checker, cancellationToken);
        }