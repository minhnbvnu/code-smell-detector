function getOuterTypeParameters(node, includeThisTypes) {
                while (true) {
                    node = node.parent;
                    if (node && isBinaryExpression(node)) {
                        const assignmentKind = getAssignmentDeclarationKind(node);
                        if (assignmentKind === 6 /* Prototype */ || assignmentKind === 3 /* PrototypeProperty */) {
                            const symbol = getSymbolOfDeclaration(node.left);
                            if (symbol && symbol.parent && !findAncestor(symbol.parent.valueDeclaration, (d) => node === d)) {
                                node = symbol.parent.valueDeclaration;
                            }
                        }
                    }
                    if (!node) {
                        return void 0;
                    }
                    switch (node.kind) {
                        case 260 /* ClassDeclaration */:
                        case 228 /* ClassExpression */:
                        case 261 /* InterfaceDeclaration */:
                        case 176 /* CallSignature */:
                        case 177 /* ConstructSignature */:
                        case 170 /* MethodSignature */:
                        case 181 /* FunctionType */:
                        case 182 /* ConstructorType */:
                        case 320 /* JSDocFunctionType */:
                        case 259 /* FunctionDeclaration */:
                        case 171 /* MethodDeclaration */:
                        case 215 /* FunctionExpression */:
                        case 216 /* ArrowFunction */:
                        case 262 /* TypeAliasDeclaration */:
                        case 348 /* JSDocTemplateTag */:
                        case 349 /* JSDocTypedefTag */:
                        case 343 /* JSDocEnumTag */:
                        case 341 /* JSDocCallbackTag */:
                        case 197 /* MappedType */:
                        case 191 /* ConditionalType */: {
                            const outerTypeParameters = getOuterTypeParameters(node, includeThisTypes);
                            if (node.kind === 197 /* MappedType */) {
                                return append(outerTypeParameters, getDeclaredTypeOfTypeParameter(getSymbolOfDeclaration(node.typeParameter)));
                            }
                            else if (node.kind === 191 /* ConditionalType */) {
                                return concatenate(outerTypeParameters, getInferTypeParameters(node));
                            }
                            const outerAndOwnTypeParameters = appendTypeParameters(outerTypeParameters, getEffectiveTypeParameterDeclarations(node));
                            const thisType = includeThisTypes && (node.kind === 260 /* ClassDeclaration */ || node.kind === 228 /* ClassExpression */ || node.kind === 261 /* InterfaceDeclaration */ || isJSConstructor(node)) && getDeclaredTypeOfClassOrInterface(getSymbolOfDeclaration(node)).thisType;
                            return thisType ? append(outerAndOwnTypeParameters, thisType) : outerAndOwnTypeParameters;
                        }
                        case 344 /* JSDocParameterTag */:
                            const paramSymbol = getParameterSymbolFromJSDoc(node);
                            if (paramSymbol) {
                                node = paramSymbol.valueDeclaration;
                            }
                            break;
                        case 323 /* JSDoc */: {
                            const outerTypeParameters = getOuterTypeParameters(node, includeThisTypes);
                            return node.tags ? appendTypeParameters(outerTypeParameters, flatMap(node.tags, (t) => isJSDocTemplateTag(t) ? t.typeParameters : void 0)) : outerTypeParameters;
                        }
                    }
                }
            }