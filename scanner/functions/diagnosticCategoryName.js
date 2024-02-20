function diagnosticCategoryName(d, lowerCase = true) {
            const name = DiagnosticCategory[d.category];
            return lowerCase ? name.toLowerCase() : name;
        }