function getCandidate() {
                const parent2 = contextToken.parent;
                if (isImportEqualsDeclaration(parent2)) {
                    keywordCompletion = contextToken.kind === 154 /* TypeKeyword */ ? void 0 : 154 /* TypeKeyword */;
                    return isModuleSpecifierMissingOrEmpty(parent2.moduleReference) ? parent2 : void 0;
                }
                if (couldBeTypeOnlyImportSpecifier(parent2, contextToken) && canCompleteFromNamedBindings(parent2.parent)) {
                    return parent2;
                }
                if (isNamedImports(parent2) || isNamespaceImport(parent2)) {
                    if (!parent2.parent.isTypeOnly && (contextToken.kind === 18 /* OpenBraceToken */ || contextToken.kind === 100 /* ImportKeyword */ || contextToken.kind === 27 /* CommaToken */)) {
                        keywordCompletion = 154 /* TypeKeyword */;
                    }
                    if (canCompleteFromNamedBindings(parent2)) {
                        if (contextToken.kind === 19 /* CloseBraceToken */ || contextToken.kind === 79 /* Identifier */) {
                            isKeywordOnlyCompletion = true;
                            keywordCompletion = 158 /* FromKeyword */;
                        }
                        else {
                            return parent2.parent.parent;
                        }
                    }
                    return void 0;
                }
                if (isImportKeyword(contextToken) && isSourceFile(parent2)) {
                    keywordCompletion = 154 /* TypeKeyword */;
                    return contextToken;
                }
                if (isImportKeyword(contextToken) && isImportDeclaration(parent2)) {
                    keywordCompletion = 154 /* TypeKeyword */;
                    return isModuleSpecifierMissingOrEmpty(parent2.moduleSpecifier) ? parent2 : void 0;
                }
                return void 0;
            }