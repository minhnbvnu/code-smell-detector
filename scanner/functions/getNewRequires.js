function getNewRequires(moduleSpecifier, quotePreference, defaultImport, namedImports, namespaceLikeImport) {
            const quotedModuleSpecifier = makeStringLiteral(moduleSpecifier, quotePreference);
            let statements;
            if (defaultImport || (namedImports == null ? void 0 : namedImports.length)) {
                const bindingElements = (namedImports == null ? void 0 : namedImports.map(({ name }) => factory.createBindingElement(
                /*dotDotDotToken*/
                void 0, 
                /*propertyName*/
                void 0, name))) || [];
                if (defaultImport) {
                    bindingElements.unshift(factory.createBindingElement(
                    /*dotDotDotToken*/
                    void 0, "default", defaultImport.name));
                }
                const declaration = createConstEqualsRequireDeclaration(factory.createObjectBindingPattern(bindingElements), quotedModuleSpecifier);
                statements = combine(statements, declaration);
            }
            if (namespaceLikeImport) {
                const declaration = createConstEqualsRequireDeclaration(namespaceLikeImport.name, quotedModuleSpecifier);
                statements = combine(statements, declaration);
            }
            return Debug.checkDefined(statements);
        }