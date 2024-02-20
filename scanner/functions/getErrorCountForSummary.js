function getErrorCountForSummary(diagnostics) {
            return countWhere(diagnostics, (diagnostic) => diagnostic.category === 1 /* Error */);
        }