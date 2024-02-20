function tryGetLocalNamedExportCompletionSymbols() {
                var _a2;
                const namedExports = contextToken && (contextToken.kind === 18 /* OpenBraceToken */ || contextToken.kind === 27 /* CommaToken */) ? tryCast(contextToken.parent, isNamedExports) : void 0;
                if (!namedExports) {
                    return 0 /* Continue */;
                }
                const localsContainer = findAncestor(namedExports, or(isSourceFile, isModuleDeclaration));
                completionKind = 5 /* None */;
                isNewIdentifierLocation = false;
                (_a2 = localsContainer.locals) == null ? void 0 : _a2.forEach((symbol, name) => {
                    var _a3, _b;
                    symbols.push(symbol);
                    if ((_b = (_a3 = localsContainer.symbol) == null ? void 0 : _a3.exports) == null ? void 0 : _b.has(name)) {
                        symbolToSortTextMap[getSymbolId(symbol)] = SortText.OptionalMember;
                    }
                });
                return 1 /* Success */;
            }