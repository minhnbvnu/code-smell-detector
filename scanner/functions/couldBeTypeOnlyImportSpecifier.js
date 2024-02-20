function couldBeTypeOnlyImportSpecifier(importSpecifier, contextToken) {
            return isImportSpecifier(importSpecifier) && (importSpecifier.isTypeOnly || contextToken === importSpecifier.name && isTypeKeywordTokenOrIdentifier(contextToken));
        }