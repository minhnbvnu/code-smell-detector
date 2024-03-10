function getContextualTypeForAssignmentDeclaration(binaryExpression) {
                var _a2, _b;
                const kind = getAssignmentDeclarationKind(binaryExpression);
                switch (kind) {
                    case 0 /* None */:
                    case 4 /* ThisProperty */:
                        const lhsSymbol = getSymbolForExpression(binaryExpression.left);
                        const decl = lhsSymbol && lhsSymbol.valueDeclaration;
                        if (decl && (isPropertyDeclaration(decl) || isPropertySignature(decl))) {
                            const overallAnnotation = getEffectiveTypeAnnotationNode(decl);
                            return overallAnnotation && instantiateType(getTypeFromTypeNode(overallAnnotation), getSymbolLinks(lhsSymbol).mapper) || (isPropertyDeclaration(decl) ? decl.initializer && getTypeOfExpression(binaryExpression.left) : void 0);
                        }
                        if (kind === 0 /* None */) {
                            return getTypeOfExpression(binaryExpression.left);
                        }
                        return getContextualTypeForThisPropertyAssignment(binaryExpression);
                    case 5 /* Property */:
                        if (isPossiblyAliasedThisProperty(binaryExpression, kind)) {
                            return getContextualTypeForThisPropertyAssignment(binaryExpression);
                        }
                        else if (!canHaveSymbol(binaryExpression.left) || !binaryExpression.left.symbol) {
                            return getTypeOfExpression(binaryExpression.left);
                        }
                        else {
                            const decl2 = binaryExpression.left.symbol.valueDeclaration;
                            if (!decl2) {
                                return void 0;
                            }
                            const lhs = cast(binaryExpression.left, isAccessExpression);
                            const overallAnnotation = getEffectiveTypeAnnotationNode(decl2);
                            if (overallAnnotation) {
                                return getTypeFromTypeNode(overallAnnotation);
                            }
                            else if (isIdentifier(lhs.expression)) {
                                const id = lhs.expression;
                                const parentSymbol = resolveName(id, id.escapedText, 111551 /* Value */, void 0, id.escapedText, 
                                /*isUse*/
                                true);
                                if (parentSymbol) {
                                    const annotated2 = parentSymbol.valueDeclaration && getEffectiveTypeAnnotationNode(parentSymbol.valueDeclaration);
                                    if (annotated2) {
                                        const nameStr = getElementOrPropertyAccessName(lhs);
                                        if (nameStr !== void 0) {
                                            return getTypeOfPropertyOfContextualType(getTypeFromTypeNode(annotated2), nameStr);
                                        }
                                    }
                                    return void 0;
                                }
                            }
                            return isInJSFile(decl2) ? void 0 : getTypeOfExpression(binaryExpression.left);
                        }
                    case 1 /* ExportsProperty */:
                    case 6 /* Prototype */:
                    case 3 /* PrototypeProperty */:
                    case 2 /* ModuleExports */:
                        let valueDeclaration;
                        if (kind !== 2 /* ModuleExports */) {
                            valueDeclaration = canHaveSymbol(binaryExpression.left) ? (_a2 = binaryExpression.left.symbol) == null ? void 0 : _a2.valueDeclaration : void 0;
                        }
                        valueDeclaration || (valueDeclaration = (_b = binaryExpression.symbol) == null ? void 0 : _b.valueDeclaration);
                        const annotated = valueDeclaration && getEffectiveTypeAnnotationNode(valueDeclaration);
                        return annotated ? getTypeFromTypeNode(annotated) : void 0;
                    case 7 /* ObjectDefinePropertyValue */:
                    case 8 /* ObjectDefinePropertyExports */:
                    case 9 /* ObjectDefinePrototypeProperty */:
                        return Debug.fail("Does not apply");
                    default:
                        return Debug.assertNever(kind);
                }
            }