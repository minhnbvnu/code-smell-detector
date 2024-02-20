function bindPotentiallyNewExpandoMemberToNamespace(declaration, namespaceSymbol, isPrototypeProperty) {
                if (!namespaceSymbol || !isExpandoSymbol(namespaceSymbol)) {
                    return;
                }
                const symbolTable = isPrototypeProperty ? namespaceSymbol.members || (namespaceSymbol.members = createSymbolTable()) : namespaceSymbol.exports || (namespaceSymbol.exports = createSymbolTable());
                let includes = 0 /* None */;
                let excludes = 0 /* None */;
                if (isFunctionLikeDeclaration(getAssignedExpandoInitializer(declaration))) {
                    includes = 8192 /* Method */;
                    excludes = 103359 /* MethodExcludes */;
                }
                else if (isCallExpression(declaration) && isBindableObjectDefinePropertyCall(declaration)) {
                    if (some(declaration.arguments[2].properties, (p) => {
                        const id = getNameOfDeclaration(p);
                        return !!id && isIdentifier(id) && idText(id) === "set";
                    })) {
                        includes |= 65536 /* SetAccessor */ | 4 /* Property */;
                        excludes |= 78783 /* SetAccessorExcludes */;
                    }
                    if (some(declaration.arguments[2].properties, (p) => {
                        const id = getNameOfDeclaration(p);
                        return !!id && isIdentifier(id) && idText(id) === "get";
                    })) {
                        includes |= 32768 /* GetAccessor */ | 4 /* Property */;
                        excludes |= 46015 /* GetAccessorExcludes */;
                    }
                }
                if (includes === 0 /* None */) {
                    includes = 4 /* Property */;
                    excludes = 0 /* PropertyExcludes */;
                }
                declareSymbol(symbolTable, namespaceSymbol, declaration, includes | 67108864 /* Assignment */, excludes & ~67108864 /* Assignment */);
            }