function getCommonDeclarationsOfSymbols(symbols) {
                let commonDeclarations;
                for (const symbol of symbols) {
                    if (!symbol.declarations) {
                        return void 0;
                    }
                    if (!commonDeclarations) {
                        commonDeclarations = new Set(symbol.declarations);
                        continue;
                    }
                    commonDeclarations.forEach((declaration) => {
                        if (!contains(symbol.declarations, declaration)) {
                            commonDeclarations.delete(declaration);
                        }
                    });
                    if (commonDeclarations.size === 0) {
                        return void 0;
                    }
                }
                return commonDeclarations;
            }