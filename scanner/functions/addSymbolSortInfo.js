function addSymbolSortInfo(symbol2) {
                    if (isStaticProperty(symbol2)) {
                        symbolToSortTextMap[getSymbolId(symbol2)] = SortText.LocalDeclarationPriority;
                    }
                }