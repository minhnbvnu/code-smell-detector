function resolveExternalModuleTypeByLiteral(name) {
                const moduleSym = resolveExternalModuleName(name, name);
                if (moduleSym) {
                    const resolvedModuleSymbol = resolveExternalModuleSymbol(moduleSym);
                    if (resolvedModuleSymbol) {
                        return getTypeOfSymbol(resolvedModuleSymbol);
                    }
                }
                return anyType;
            }