function tryGetMemberInModuleExports(memberName, moduleSymbol) {
                const symbolTable = getExportsOfModule(moduleSymbol);
                if (symbolTable) {
                    return symbolTable.get(memberName);
                }
            }