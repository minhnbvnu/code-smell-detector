function combineSymbolTables(first2, second) {
                if (!(first2 == null ? void 0 : first2.size))
                    return second;
                if (!(second == null ? void 0 : second.size))
                    return first2;
                const combined = createSymbolTable();
                mergeSymbolTable(combined, first2);
                mergeSymbolTable(combined, second);
                return combined;
            }