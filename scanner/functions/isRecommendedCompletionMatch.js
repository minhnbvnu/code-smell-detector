function isRecommendedCompletionMatch(localSymbol, recommendedCompletion, checker) {
            return localSymbol === recommendedCompletion || !!(localSymbol.flags & 1048576 /* ExportValue */) && checker.getExportSymbolOfSymbol(localSymbol) === recommendedCompletion;
        }