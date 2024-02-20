function getFirstSymbolInChain(symbol, enclosingDeclaration, checker) {
            const chain = checker.getAccessibleSymbolChain(symbol, enclosingDeclaration, 
            /*meaning*/
            67108863 /* All */, 
            /*useOnlyExternalAliasing*/
            false);
            if (chain)
                return first(chain);
            return symbol.parent && (isModuleSymbol(symbol.parent) ? symbol : getFirstSymbolInChain(symbol.parent, enclosingDeclaration, checker));
        }