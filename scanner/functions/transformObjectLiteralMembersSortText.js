function transformObjectLiteralMembersSortText(start2) {
                var _a2;
                for (let i = start2; i < symbols.length; i++) {
                    const symbol = symbols[i];
                    const symbolId = getSymbolId(symbol);
                    const origin = symbolToOriginInfoMap == null ? void 0 : symbolToOriginInfoMap[i];
                    const target = getEmitScriptTarget(compilerOptions);
                    const displayName = getCompletionEntryDisplayNameForSymbol(symbol, target, origin, 0 /* ObjectPropertyDeclaration */, 
                    /*jsxIdentifierExpected*/
                    false);
                    if (displayName) {
                        const originalSortText = (_a2 = symbolToSortTextMap[symbolId]) != null ? _a2 : SortText.LocationPriority;
                        const { name } = displayName;
                        symbolToSortTextMap[symbolId] = SortText.ObjectLiteralProperty(originalSortText, name);
                    }
                }
            }