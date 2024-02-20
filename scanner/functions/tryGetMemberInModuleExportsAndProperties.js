function tryGetMemberInModuleExportsAndProperties(memberName, moduleSymbol) {
                const symbol = tryGetMemberInModuleExports(memberName, moduleSymbol);
                if (symbol) {
                    return symbol;
                }
                const exportEquals = resolveExternalModuleSymbol(moduleSymbol);
                if (exportEquals === moduleSymbol) {
                    return void 0;
                }
                const type = getTypeOfSymbol(exportEquals);
                return shouldTreatPropertiesOfExternalModuleAsExports(type) ? getPropertyOfType(type, memberName) : void 0;
            }