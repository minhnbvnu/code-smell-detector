function getStringLiteralCompletions(sourceFile, position, contextToken, options, host, program, log, preferences, includeSymbol) {
            if (isInReferenceComment(sourceFile, position)) {
                const entries = getTripleSlashReferenceCompletion(sourceFile, position, options, host);
                return entries && convertPathCompletions(entries);
            }
            if (isInString(sourceFile, position, contextToken)) {
                if (!contextToken || !isStringLiteralLike(contextToken))
                    return void 0;
                const entries = getStringLiteralCompletionEntries(sourceFile, contextToken, position, program.getTypeChecker(), options, host, preferences);
                return convertStringLiteralCompletions(entries, contextToken, sourceFile, host, program, log, options, preferences, position, includeSymbol);
            }
        }