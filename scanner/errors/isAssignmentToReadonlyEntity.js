function isAssignmentToReadonlyEntity(expr, symbol, assignmentKind) {
                var _a2, _b;
                if (assignmentKind === 0 /* None */) {
                    return false;
                }
                if (isReadonlySymbol(symbol)) {
                    if (symbol.flags & 4 /* Property */ && isAccessExpression(expr) && expr.expression.kind === 108 /* ThisKeyword */) {
                        const ctor = getContainingFunction(expr);
                        if (!(ctor && (ctor.kind === 173 /* Constructor */ || isJSConstructor(ctor)))) {
                            return true;
                        }
                        if (symbol.valueDeclaration) {
                            const isAssignmentDeclaration2 = isBinaryExpression(symbol.valueDeclaration);
                            const isLocalPropertyDeclaration = ctor.parent === symbol.valueDeclaration.parent;
                            const isLocalParameterProperty = ctor === symbol.valueDeclaration.parent;
                            const isLocalThisPropertyAssignment = isAssignmentDeclaration2 && ((_a2 = symbol.parent) == null ? void 0 : _a2.valueDeclaration) === ctor.parent;
                            const isLocalThisPropertyAssignmentConstructorFunction = isAssignmentDeclaration2 && ((_b = symbol.parent) == null ? void 0 : _b.valueDeclaration) === ctor;
                            const isWriteableSymbol = isLocalPropertyDeclaration || isLocalParameterProperty || isLocalThisPropertyAssignment || isLocalThisPropertyAssignmentConstructorFunction;
                            return !isWriteableSymbol;
                        }
                    }
                    return true;
                }
                if (isAccessExpression(expr)) {
                    const node = skipParentheses(expr.expression);
                    if (node.kind === 79 /* Identifier */) {
                        const symbol2 = getNodeLinks(node).resolvedSymbol;
                        if (symbol2.flags & 2097152 /* Alias */) {
                            const declaration = getDeclarationOfAliasSymbol(symbol2);
                            return !!declaration && declaration.kind === 271 /* NamespaceImport */;
                        }
                    }
                }
                return false;
            }