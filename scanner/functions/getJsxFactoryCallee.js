function getJsxFactoryCallee(isStaticChildren) {
                const type = getJsxFactoryCalleePrimitive(isStaticChildren);
                return getImplicitImportForName(type);
            }