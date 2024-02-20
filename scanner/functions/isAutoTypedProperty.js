function isAutoTypedProperty(symbol) {
                const declaration = symbol.valueDeclaration;
                return declaration && isPropertyDeclaration(declaration) && !getEffectiveTypeAnnotationNode(declaration) && !declaration.initializer && (noImplicitAny || isInJSFile(declaration));
            }