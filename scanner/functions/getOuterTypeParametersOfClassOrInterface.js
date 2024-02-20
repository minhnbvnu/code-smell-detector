function getOuterTypeParametersOfClassOrInterface(symbol) {
                var _a2;
                const declaration = symbol.flags & 32 /* Class */ || symbol.flags & 16 /* Function */ ? symbol.valueDeclaration : (_a2 = symbol.declarations) == null ? void 0 : _a2.find((decl) => {
                    if (decl.kind === 261 /* InterfaceDeclaration */) {
                        return true;
                    }
                    if (decl.kind !== 257 /* VariableDeclaration */) {
                        return false;
                    }
                    const initializer = decl.initializer;
                    return !!initializer && (initializer.kind === 215 /* FunctionExpression */ || initializer.kind === 216 /* ArrowFunction */);
                });
                Debug.assert(!!declaration, "Class was missing valueDeclaration -OR- non-class had no interface declarations");
                return getOuterTypeParameters(declaration);
            }