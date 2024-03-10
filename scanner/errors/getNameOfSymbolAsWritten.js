function getNameOfSymbolAsWritten(symbol, context) {
                if (context && symbol.escapedName === "default" /* Default */ && !(context.flags & 16384 /* UseAliasDefinedOutsideCurrentScope */) && // If it's not the first part of an entity name, it must print as `default`
                    (!(context.flags & 16777216 /* InInitialEntityName */) || // if the symbol is synthesized, it will only be referenced externally it must print as `default`
                        !symbol.declarations || // if not in the same binding context (source file, module declaration), it must print as `default`
                        context.enclosingDeclaration && findAncestor(symbol.declarations[0], isDefaultBindingContext) !== findAncestor(context.enclosingDeclaration, isDefaultBindingContext))) {
                    return "default";
                }
                if (symbol.declarations && symbol.declarations.length) {
                    let declaration = firstDefined(symbol.declarations, (d) => getNameOfDeclaration(d) ? d : void 0);
                    const name2 = declaration && getNameOfDeclaration(declaration);
                    if (declaration && name2) {
                        if (isCallExpression(declaration) && isBindableObjectDefinePropertyCall(declaration)) {
                            return symbolName(symbol);
                        }
                        if (isComputedPropertyName(name2) && !(getCheckFlags(symbol) & 4096 /* Late */)) {
                            const nameType = getSymbolLinks(symbol).nameType;
                            if (nameType && nameType.flags & 384 /* StringOrNumberLiteral */) {
                                const result = getNameOfSymbolFromNameType(symbol, context);
                                if (result !== void 0) {
                                    return result;
                                }
                            }
                        }
                        return declarationNameToString(name2);
                    }
                    if (!declaration) {
                        declaration = symbol.declarations[0];
                    }
                    if (declaration.parent && declaration.parent.kind === 257 /* VariableDeclaration */) {
                        return declarationNameToString(declaration.parent.name);
                    }
                    switch (declaration.kind) {
                        case 228 /* ClassExpression */:
                        case 215 /* FunctionExpression */:
                        case 216 /* ArrowFunction */:
                            if (context && !context.encounteredError && !(context.flags & 131072 /* AllowAnonymousIdentifier */)) {
                                context.encounteredError = true;
                            }
                            return declaration.kind === 228 /* ClassExpression */ ? "(Anonymous class)" : "(Anonymous function)";
                    }
                }
                const name = getNameOfSymbolFromNameType(symbol, context);
                return name !== void 0 ? name : symbolName(symbol);
            }