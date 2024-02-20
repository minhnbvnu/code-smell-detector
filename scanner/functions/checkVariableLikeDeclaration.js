function checkVariableLikeDeclaration(node) {
                var _a2;
                checkDecorators(node);
                if (!isBindingElement(node)) {
                    checkSourceElement(node.type);
                }
                if (!node.name) {
                    return;
                }
                if (node.name.kind === 164 /* ComputedPropertyName */) {
                    checkComputedPropertyName(node.name);
                    if (hasOnlyExpressionInitializer(node) && node.initializer) {
                        checkExpressionCached(node.initializer);
                    }
                }
                if (isBindingElement(node)) {
                    if (node.propertyName && isIdentifier(node.name) && isParameterDeclaration(node) && nodeIsMissing(getContainingFunction(node).body)) {
                        potentialUnusedRenamedBindingElementsInTypes.push(node);
                        return;
                    }
                    if (isObjectBindingPattern(node.parent) && node.dotDotDotToken && languageVersion < 5 /* ES2018 */) {
                        checkExternalEmitHelpers(node, 4 /* Rest */);
                    }
                    if (node.propertyName && node.propertyName.kind === 164 /* ComputedPropertyName */) {
                        checkComputedPropertyName(node.propertyName);
                    }
                    const parent2 = node.parent.parent;
                    const parentCheckMode = node.dotDotDotToken ? 64 /* RestBindingElement */ : 0 /* Normal */;
                    const parentType = getTypeForBindingElementParent(parent2, parentCheckMode);
                    const name = node.propertyName || node.name;
                    if (parentType && !isBindingPattern(name)) {
                        const exprType = getLiteralTypeFromPropertyName(name);
                        if (isTypeUsableAsPropertyName(exprType)) {
                            const nameText = getPropertyNameFromType(exprType);
                            const property = getPropertyOfType(parentType, nameText);
                            if (property) {
                                markPropertyAsReferenced(property, 
                                /*nodeForCheckWriteOnly*/
                                void 0, 
                                /*isSelfTypeAccess*/
                                false);
                                checkPropertyAccessibility(node, !!parent2.initializer && parent2.initializer.kind === 106 /* SuperKeyword */, 
                                /*writing*/
                                false, parentType, property);
                            }
                        }
                    }
                }
                if (isBindingPattern(node.name)) {
                    if (node.name.kind === 204 /* ArrayBindingPattern */ && languageVersion < 2 /* ES2015 */ && compilerOptions.downlevelIteration) {
                        checkExternalEmitHelpers(node, 512 /* Read */);
                    }
                    forEach(node.name.elements, checkSourceElement);
                }
                if (isParameter(node) && node.initializer && nodeIsMissing(getContainingFunction(node).body)) {
                    error(node, Diagnostics.A_parameter_initializer_is_only_allowed_in_a_function_or_constructor_implementation);
                    return;
                }
                if (isBindingPattern(node.name)) {
                    const needCheckInitializer = hasOnlyExpressionInitializer(node) && node.initializer && node.parent.parent.kind !== 246 /* ForInStatement */;
                    const needCheckWidenedType = !some(node.name.elements, not(isOmittedExpression));
                    if (needCheckInitializer || needCheckWidenedType) {
                        const widenedType = getWidenedTypeForVariableLikeDeclaration(node);
                        if (needCheckInitializer) {
                            const initializerType = checkExpressionCached(node.initializer);
                            if (strictNullChecks && needCheckWidenedType) {
                                checkNonNullNonVoidType(initializerType, node);
                            }
                            else {
                                checkTypeAssignableToAndOptionallyElaborate(initializerType, getWidenedTypeForVariableLikeDeclaration(node), node, node.initializer);
                            }
                        }
                        if (needCheckWidenedType) {
                            if (isArrayBindingPattern(node.name)) {
                                checkIteratedTypeOrElementType(65 /* Destructuring */, widenedType, undefinedType, node);
                            }
                            else if (strictNullChecks) {
                                checkNonNullNonVoidType(widenedType, node);
                            }
                        }
                    }
                    return;
                }
                const symbol = getSymbolOfDeclaration(node);
                if (symbol.flags & 2097152 /* Alias */ && (isVariableDeclarationInitializedToBareOrAccessedRequire(node) || isBindingElementOfBareOrAccessedRequire(node))) {
                    checkAliasSymbol(node);
                    return;
                }
                const type = convertAutoToAny(getTypeOfSymbol(symbol));
                if (node === symbol.valueDeclaration) {
                    const initializer = hasOnlyExpressionInitializer(node) && getEffectiveInitializer(node);
                    if (initializer) {
                        const isJSObjectLiteralInitializer = isInJSFile(node) && isObjectLiteralExpression(initializer) && (initializer.properties.length === 0 || isPrototypeAccess(node.name)) && !!((_a2 = symbol.exports) == null ? void 0 : _a2.size);
                        if (!isJSObjectLiteralInitializer && node.parent.parent.kind !== 246 /* ForInStatement */) {
                            checkTypeAssignableToAndOptionallyElaborate(checkExpressionCached(initializer), type, node, initializer, 
                            /*headMessage*/
                            void 0);
                        }
                    }
                    if (symbol.declarations && symbol.declarations.length > 1) {
                        if (some(symbol.declarations, (d) => d !== node && isVariableLike(d) && !areDeclarationFlagsIdentical(d, node))) {
                            error(node.name, Diagnostics.All_declarations_of_0_must_have_identical_modifiers, declarationNameToString(node.name));
                        }
                    }
                }
                else {
                    const declarationType = convertAutoToAny(getWidenedTypeForVariableLikeDeclaration(node));
                    if (!isErrorType(type) && !isErrorType(declarationType) && !isTypeIdenticalTo(type, declarationType) && !(symbol.flags & 67108864 /* Assignment */)) {
                        errorNextVariableOrPropertyDeclarationMustHaveSameType(symbol.valueDeclaration, type, node, declarationType);
                    }
                    if (hasOnlyExpressionInitializer(node) && node.initializer) {
                        checkTypeAssignableToAndOptionallyElaborate(checkExpressionCached(node.initializer), declarationType, node, node.initializer, 
                        /*headMessage*/
                        void 0);
                    }
                    if (symbol.valueDeclaration && !areDeclarationFlagsIdentical(node, symbol.valueDeclaration)) {
                        error(node.name, Diagnostics.All_declarations_of_0_must_have_identical_modifiers, declarationNameToString(node.name));
                    }
                }
                if (node.kind !== 169 /* PropertyDeclaration */ && node.kind !== 168 /* PropertySignature */) {
                    checkExportsOnMergedDeclarations(node);
                    if (node.kind === 257 /* VariableDeclaration */ || node.kind === 205 /* BindingElement */) {
                        checkVarDeclaredNamesNotShadowed(node);
                    }
                    checkCollisionsForDeclarationName(node, node.name);
                }
            }