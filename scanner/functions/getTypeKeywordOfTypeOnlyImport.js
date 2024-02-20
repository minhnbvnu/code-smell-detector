function getTypeKeywordOfTypeOnlyImport(importClause, sourceFile) {
            Debug.assert(importClause.isTypeOnly);
            return cast(importClause.getChildAt(0, sourceFile), isTypeKeywordToken);
        }