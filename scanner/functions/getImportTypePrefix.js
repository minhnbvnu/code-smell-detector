function getImportTypePrefix(moduleSpecifier, quotePreference) {
            const quote2 = getQuoteFromPreference(quotePreference);
            return `import(${quote2}${moduleSpecifier}${quote2}).`;
        }