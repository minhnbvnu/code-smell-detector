function getPromoteTypeOnlyCompletionAction(sourceFile, symbolToken, program, host, formatContext, preferences) {
            const compilerOptions = program.getCompilerOptions();
            const symbolName2 = single(getSymbolNamesToImport(sourceFile, program.getTypeChecker(), symbolToken, compilerOptions));
            const fix = getTypeOnlyPromotionFix(sourceFile, symbolToken, symbolName2, program);
            const includeSymbolNameInDescription = symbolName2 !== symbolToken.text;
            return fix && codeFixActionToCodeAction(codeActionForFix({ host, formatContext, preferences }, sourceFile, symbolName2, fix, includeSymbolNameInDescription, compilerOptions, preferences));
        }