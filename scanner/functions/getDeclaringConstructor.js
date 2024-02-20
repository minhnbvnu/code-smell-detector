function getDeclaringConstructor(symbol) {
                if (!symbol.declarations) {
                    return;
                }
                for (const declaration of symbol.declarations) {
                    const container = getThisContainer(declaration, 
                    /*includeArrowFunctions*/
                    false, 
                    /*includeClassComputedPropertyName*/
                    false);
                    if (container && (container.kind === 173 /* Constructor */ || isJSConstructor(container))) {
                        return container;
                    }
                }
            }