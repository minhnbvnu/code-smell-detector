function shouldOfferImportCompletions() {
                if (importStatementCompletion)
                    return true;
                if (isNonContextualObjectLiteral)
                    return false;
                if (!preferences.includeCompletionsForModuleExports)
                    return false;
                if (sourceFile.externalModuleIndicator || sourceFile.commonJsModuleIndicator)
                    return true;
                if (compilerOptionsIndicateEsModules(program.getCompilerOptions()))
                    return true;
                return programContainsModules(program);
            }