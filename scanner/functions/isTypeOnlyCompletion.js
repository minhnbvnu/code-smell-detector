function isTypeOnlyCompletion() {
                return insideJsDocTagTypeExpression || !!importStatementCompletion && isTypeOnlyImportOrExportDeclaration(location.parent) || !isContextTokenValueLocation(contextToken) && (isPossiblyTypeArgumentPosition(contextToken, sourceFile, typeChecker) || isPartOfTypeNode(location) || isContextTokenTypeLocation(contextToken));
            }