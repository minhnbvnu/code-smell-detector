function addDuplicateLocations(locs, symbol) {
                    if (symbol.declarations) {
                        for (const decl of symbol.declarations) {
                            pushIfUnique(locs, decl);
                        }
                    }
                }