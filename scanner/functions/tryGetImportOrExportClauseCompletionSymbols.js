function tryGetImportOrExportClauseCompletionSymbols() {
                if (!contextToken)
                    return 0 /* Continue */;
                const namedImportsOrExports = contextToken.kind === 18 /* OpenBraceToken */ || contextToken.kind === 27 /* CommaToken */ ? tryCast(contextToken.parent, isNamedImportsOrExports) : isTypeKeywordTokenOrIdentifier(contextToken) ? tryCast(contextToken.parent.parent, isNamedImportsOrExports) : void 0;
                if (!namedImportsOrExports)
                    return 0 /* Continue */;
                if (!isTypeKeywordTokenOrIdentifier(contextToken)) {
                    keywordFilters = 8 /* TypeKeyword */;
                }
                const { moduleSpecifier } = namedImportsOrExports.kind === 272 /* NamedImports */ ? namedImportsOrExports.parent.parent : namedImportsOrExports.parent;
                if (!moduleSpecifier) {
                    isNewIdentifierLocation = true;
                    return namedImportsOrExports.kind === 272 /* NamedImports */ ? 2 /* Fail */ : 0 /* Continue */;
                }
                const moduleSpecifierSymbol = typeChecker.getSymbolAtLocation(moduleSpecifier);
                if (!moduleSpecifierSymbol) {
                    isNewIdentifierLocation = true;
                    return 2 /* Fail */;
                }
                completionKind = 3 /* MemberLike */;
                isNewIdentifierLocation = false;
                const exports = typeChecker.getExportsAndPropertiesOfModule(moduleSpecifierSymbol);
                const existing = new Set(namedImportsOrExports.elements.filter((n) => !isCurrentlyEditingNode(n)).map((n) => (n.propertyName || n.name).escapedText));
                const uniques = exports.filter((e) => e.escapedName !== "default" /* Default */ && !existing.has(e.escapedName));
                symbols = concatenate(symbols, uniques);
                if (!uniques.length) {
                    keywordFilters = 0 /* None */;
                }
                return 1 /* Success */;
            }