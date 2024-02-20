function getImportStatementCompletionInfo(contextToken) {
            var _a2, _b, _c;
            let keywordCompletion;
            let isKeywordOnlyCompletion = false;
            const candidate = getCandidate();
            return {
                isKeywordOnlyCompletion,
                keywordCompletion,
                isNewIdentifierLocation: !!(candidate || keywordCompletion === 154 /* TypeKeyword */),
                isTopLevelTypeOnly: !!((_b = (_a2 = tryCast(candidate, isImportDeclaration)) == null ? void 0 : _a2.importClause) == null ? void 0 : _b.isTypeOnly) || !!((_c = tryCast(candidate, isImportEqualsDeclaration)) == null ? void 0 : _c.isTypeOnly),
                couldBeTypeOnlyImportSpecifier: !!candidate && couldBeTypeOnlyImportSpecifier(candidate, contextToken),
                replacementSpan: getSingleLineReplacementSpanForImportCompletionNode(candidate)
            };
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
        }