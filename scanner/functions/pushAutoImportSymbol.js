function pushAutoImportSymbol(symbol, origin) {
                const symbolId = getSymbolId(symbol);
                if (symbolToSortTextMap[symbolId] === SortText.GlobalsOrKeywords) {
                    return;
                }
                symbolToOriginInfoMap[symbols.length] = origin;
                symbolToSortTextMap[symbolId] = importStatementCompletion ? SortText.LocationPriority : SortText.AutoImportSuggestions;
                symbols.push(symbol);
            }