function getDeclarationOfJSPrototypeContainer(symbol) {
                const decl = symbol.parent.valueDeclaration;
                if (!decl) {
                    return void 0;
                }
                const initializer = isAssignmentDeclaration(decl) ? getAssignedExpandoInitializer(decl) : hasOnlyExpressionInitializer(decl) ? getDeclaredExpandoInitializer(decl) : void 0;
                return initializer || decl;
            }