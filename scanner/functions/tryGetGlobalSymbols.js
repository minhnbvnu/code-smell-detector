function tryGetGlobalSymbols() {
                const result = tryGetObjectTypeLiteralInTypeArgumentCompletionSymbols() || tryGetObjectLikeCompletionSymbols() || tryGetImportCompletionSymbols() || tryGetImportOrExportClauseCompletionSymbols() || tryGetLocalNamedExportCompletionSymbols() || tryGetConstructorCompletion() || tryGetClassLikeCompletionSymbols() || tryGetJsxCompletionSymbols() || (getGlobalCompletions(), 1 /* Success */);
                return result === 1 /* Success */;
            }