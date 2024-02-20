function getExplicitTypeOfSymbol(symbol, diagnostic) {
                symbol = resolveSymbol(symbol);
                if (symbol.flags & (16 /* Function */ | 8192 /* Method */ | 32 /* Class */ | 512 /* ValueModule */)) {
                    return getTypeOfSymbol(symbol);
                }
                if (symbol.flags & (3 /* Variable */ | 4 /* Property */)) {
                    if (getCheckFlags(symbol) & 262144 /* Mapped */) {
                        const origin = symbol.links.syntheticOrigin;
                        if (origin && getExplicitTypeOfSymbol(origin)) {
                            return getTypeOfSymbol(symbol);
                        }
                    }
                    const declaration = symbol.valueDeclaration;
                    if (declaration) {
                        if (isDeclarationWithExplicitTypeAnnotation(declaration)) {
                            return getTypeOfSymbol(symbol);
                        }
                        if (isVariableDeclaration(declaration) && declaration.parent.parent.kind === 247 /* ForOfStatement */) {
                            const statement = declaration.parent.parent;
                            const expressionType = getTypeOfDottedName(statement.expression, 
                            /*diagnostic*/
                            void 0);
                            if (expressionType) {
                                const use = statement.awaitModifier ? 15 /* ForAwaitOf */ : 13 /* ForOf */;
                                return checkIteratedTypeOrElementType(use, expressionType, undefinedType, 
                                /*errorNode*/
                                void 0);
                            }
                        }
                        if (diagnostic) {
                            addRelatedInfo(diagnostic, createDiagnosticForNode(declaration, Diagnostics._0_needs_an_explicit_type_annotation, symbolToString(symbol)));
                        }
                    }
                }
            }