function createParameter(name, type) {
                const symbol = createSymbol(1 /* FunctionScopedVariable */, name);
                symbol.links.type = type;
                return symbol;
            }