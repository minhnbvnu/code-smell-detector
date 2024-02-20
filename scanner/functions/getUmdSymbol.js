function getUmdSymbol(token, checker) {
            const umdSymbol = isIdentifier(token) ? checker.getSymbolAtLocation(token) : void 0;
            if (isUMDExportSymbol(umdSymbol))
                return umdSymbol;
            const { parent: parent2 } = token;
            if (isJsxOpeningLikeElement(parent2) && parent2.tagName === token || isJsxOpeningFragment(parent2)) {
                const parentSymbol = checker.resolveName(checker.getJsxNamespace(parent2), isJsxOpeningLikeElement(parent2) ? token : parent2, 111551 /* Value */, 
                /*excludeGlobals*/
                false);
                if (isUMDExportSymbol(parentSymbol)) {
                    return parentSymbol;
                }
            }
            return void 0;
        }