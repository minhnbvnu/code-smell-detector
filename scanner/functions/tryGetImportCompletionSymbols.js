function tryGetImportCompletionSymbols() {
                if (!importStatementCompletion)
                    return 0 /* Continue */;
                isNewIdentifierLocation = true;
                collectAutoImports();
                return 1 /* Success */;
            }