function getInitializerTypeFromAssignmentDeclaration(symbol, resolvedSymbol, expression, kind) {
                if (isCallExpression(expression)) {
                    if (resolvedSymbol) {
                        return getTypeOfSymbol(resolvedSymbol);
                    }
                    const objectLitType = checkExpressionCached(expression.arguments[2]);
                    const valueType = getTypeOfPropertyOfType(objectLitType, "value");
                    if (valueType) {
                        return valueType;
                    }
                    const getFunc = getTypeOfPropertyOfType(objectLitType, "get");
                    if (getFunc) {
                        const getSig = getSingleCallSignature(getFunc);
                        if (getSig) {
                            return getReturnTypeOfSignature(getSig);
                        }
                    }
                    const setFunc = getTypeOfPropertyOfType(objectLitType, "set");
                    if (setFunc) {
                        const setSig = getSingleCallSignature(setFunc);
                        if (setSig) {
                            return getTypeOfFirstParameterOfSignature(setSig);
                        }
                    }
                    return anyType;
                }
                if (containsSameNamedThisProperty(expression.left, expression.right)) {
                    return anyType;
                }
                const isDirectExport = kind === 1 /* ExportsProperty */ && (isPropertyAccessExpression(expression.left) || isElementAccessExpression(expression.left)) && (isModuleExportsAccessExpression(expression.left.expression) || isIdentifier(expression.left.expression) && isExportsIdentifier(expression.left.expression));
                const type = resolvedSymbol ? getTypeOfSymbol(resolvedSymbol) : isDirectExport ? getRegularTypeOfLiteralType(checkExpressionCached(expression.right)) : getWidenedLiteralType(checkExpressionCached(expression.right));
                if (type.flags & 524288 /* Object */ && kind === 2 /* ModuleExports */ && symbol.escapedName === "export=" /* ExportEquals */) {
                    const exportedType = resolveStructuredTypeMembers(type);
                    const members = createSymbolTable();
                    copyEntries(exportedType.members, members);
                    const initialSize = members.size;
                    if (resolvedSymbol && !resolvedSymbol.exports) {
                        resolvedSymbol.exports = createSymbolTable();
                    }
                    (resolvedSymbol || symbol).exports.forEach((s, name) => {
                        var _a2;
                        const exportedMember = members.get(name);
                        if (exportedMember && exportedMember !== s && !(s.flags & 2097152 /* Alias */)) {
                            if (s.flags & 111551 /* Value */ && exportedMember.flags & 111551 /* Value */) {
                                if (s.valueDeclaration && exportedMember.valueDeclaration && getSourceFileOfNode(s.valueDeclaration) !== getSourceFileOfNode(exportedMember.valueDeclaration)) {
                                    const unescapedName = unescapeLeadingUnderscores(s.escapedName);
                                    const exportedMemberName = ((_a2 = tryCast(exportedMember.valueDeclaration, isNamedDeclaration)) == null ? void 0 : _a2.name) || exportedMember.valueDeclaration;
                                    addRelatedInfo(error(s.valueDeclaration, Diagnostics.Duplicate_identifier_0, unescapedName), createDiagnosticForNode(exportedMemberName, Diagnostics._0_was_also_declared_here, unescapedName));
                                    addRelatedInfo(error(exportedMemberName, Diagnostics.Duplicate_identifier_0, unescapedName), createDiagnosticForNode(s.valueDeclaration, Diagnostics._0_was_also_declared_here, unescapedName));
                                }
                                const union = createSymbol(s.flags | exportedMember.flags, name);
                                union.links.type = getUnionType([getTypeOfSymbol(s), getTypeOfSymbol(exportedMember)]);
                                union.valueDeclaration = exportedMember.valueDeclaration;
                                union.declarations = concatenate(exportedMember.declarations, s.declarations);
                                members.set(name, union);
                            }
                            else {
                                members.set(name, mergeSymbol(s, exportedMember));
                            }
                        }
                        else {
                            members.set(name, s);
                        }
                    });
                    const result = createAnonymousType(initialSize !== members.size ? void 0 : exportedType.symbol, 
                    // Only set the type's symbol if it looks to be the same as the original type
                    members, exportedType.callSignatures, exportedType.constructSignatures, exportedType.indexInfos);
                    if (initialSize === members.size) {
                        if (type.aliasSymbol) {
                            result.aliasSymbol = type.aliasSymbol;
                            result.aliasTypeArguments = type.aliasTypeArguments;
                        }
                        if (getObjectFlags(type) & 4 /* Reference */) {
                            result.aliasSymbol = type.symbol;
                            const args = getTypeArguments(type);
                            result.aliasTypeArguments = length(args) ? args : void 0;
                        }
                    }
                    result.objectFlags |= getObjectFlags(type) & 4096 /* JSLiteral */;
                    if (result.symbol && result.symbol.flags & 32 /* Class */ && type === getDeclaredTypeOfClassOrInterface(result.symbol)) {
                        result.objectFlags |= 16777216 /* IsClassInstanceClone */;
                    }
                    return result;
                }
                if (isEmptyArrayLiteralType(type)) {
                    reportImplicitAny(expression, anyArrayType);
                    return anyArrayType;
                }
                return type;
            }