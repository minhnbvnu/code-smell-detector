function tryCreateNamedImportsFromObjectBindingPattern(node) {
            const importSpecifiers = [];
            for (const element of node.elements) {
                if (!isIdentifier(element.name) || element.initializer) {
                    return void 0;
                }
                importSpecifiers.push(factory.createImportSpecifier(
                /*isTypeOnly*/
                false, tryCast(element.propertyName, isIdentifier), element.name));
            }
            if (importSpecifiers.length) {
                return factory.createNamedImports(importSpecifiers);
            }
        }