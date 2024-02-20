function isErrorLike(type) {
                var _a;
                if (type.isIntersection()) {
                    return type.types.some(isErrorLike);
                }
                if (type.isUnion()) {
                    return type.types.every(isErrorLike);
                }
                const symbol = type.getSymbol();
                if (!symbol) {
                    return false;
                }
                if (symbol.getName() === 'Error') {
                    const declarations = (_a = symbol.getDeclarations()) !== null && _a !== void 0 ? _a : [];
                    for (const declaration of declarations) {
                        const sourceFile = declaration.getSourceFile();
                        if (program.isSourceFileDefaultLibrary(sourceFile)) {
                            return true;
                        }
                    }
                }
                if (symbol.flags & (ts.SymbolFlags.Class | ts.SymbolFlags.Interface)) {
                    for (const baseType of checker.getBaseTypes(type)) {
                        if (isErrorLike(baseType)) {
                            return true;
                        }
                    }
                }
                return false;
            }