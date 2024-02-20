function getDeclaredTypeOfTypeAlias(symbol) {
                var _a2;
                const links = getSymbolLinks(symbol);
                if (!links.declaredType) {
                    if (!pushTypeResolution(symbol, 2 /* DeclaredType */)) {
                        return errorType;
                    }
                    const declaration = Debug.checkDefined((_a2 = symbol.declarations) == null ? void 0 : _a2.find(isTypeAlias), "Type alias symbol with no valid declaration found");
                    const typeNode = isJSDocTypeAlias(declaration) ? declaration.typeExpression : declaration.type;
                    let type = typeNode ? getTypeFromTypeNode(typeNode) : errorType;
                    if (popTypeResolution()) {
                        const typeParameters = getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(symbol);
                        if (typeParameters) {
                            links.typeParameters = typeParameters;
                            links.instantiations = /* @__PURE__ */ new Map();
                            links.instantiations.set(getTypeListId(typeParameters), type);
                        }
                    }
                    else {
                        type = errorType;
                        if (declaration.kind === 343 /* JSDocEnumTag */) {
                            error(declaration.typeExpression.type, Diagnostics.Type_alias_0_circularly_references_itself, symbolToString(symbol));
                        }
                        else {
                            error(isNamedDeclaration(declaration) ? declaration.name || declaration : declaration, Diagnostics.Type_alias_0_circularly_references_itself, symbolToString(symbol));
                        }
                    }
                    links.declaredType = type;
                }
                return links.declaredType;
            }