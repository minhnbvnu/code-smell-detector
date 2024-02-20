function getQuotePreference(sourceFile, preferences) {
            if (preferences.quotePreference && preferences.quotePreference !== "auto") {
                return preferences.quotePreference === "single" ? 0 /* Single */ : 1 /* Double */;
            }
            else {
                const firstModuleSpecifier = sourceFile.imports && find(sourceFile.imports, (n) => isStringLiteral(n) && !nodeIsSynthesized(n.parent));
                return firstModuleSpecifier ? quotePreferenceFromString(firstModuleSpecifier, sourceFile) : 1 /* Double */;
            }
        }