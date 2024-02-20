function isAllowedTypeImportPattern(importSource) {
                return (
                // As long as there's one matching pattern that allows type import
                allowedImportTypeMatchers.some(matcher => matcher.ignores(importSource)));
            }