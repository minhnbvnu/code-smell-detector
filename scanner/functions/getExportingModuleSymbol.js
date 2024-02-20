function getExportingModuleSymbol(parent2, checker) {
            if (isSourceFile(parent2)) {
                return parent2.symbol;
            }
            const symbol = parent2.parent.symbol;
            if (symbol.valueDeclaration && isExternalModuleAugmentation(symbol.valueDeclaration)) {
                return checker.getMergedSymbol(symbol);
            }
            return symbol;
        }