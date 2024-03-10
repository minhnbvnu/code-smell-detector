function visitDeclarationSubtree(input) {
                if (shouldStripInternal(input))
                    return;
                if (isDeclaration(input)) {
                    if (isDeclarationAndNotVisible(input))
                        return;
                    if (hasDynamicName(input) && !resolver.isLateBound(getParseTreeNode(input))) {
                        return;
                    }
                }
                if (isFunctionLike(input) && resolver.isImplementationOfOverload(input))
                    return;
                if (isSemicolonClassElement(input))
                    return;
                let previousEnclosingDeclaration;
                if (isEnclosingDeclaration(input)) {
                    previousEnclosingDeclaration = enclosingDeclaration;
                    enclosingDeclaration = input;
                }
                const oldDiag = getSymbolAccessibilityDiagnostic;
                const canProduceDiagnostic = canProduceDiagnostics(input);
                const oldWithinObjectLiteralType = suppressNewDiagnosticContexts;
                let shouldEnterSuppressNewDiagnosticsContextContext = (input.kind === 184 /* TypeLiteral */ || input.kind === 197 /* MappedType */) && input.parent.kind !== 262 /* TypeAliasDeclaration */;
                if (isMethodDeclaration(input) || isMethodSignature(input)) {
                    if (hasEffectiveModifier(input, 8 /* Private */)) {
                        if (input.symbol && input.symbol.declarations && input.symbol.declarations[0] !== input)
                            return;
                        return cleanup(factory2.createPropertyDeclaration(ensureModifiers(input), input.name, 
                        /*questionToken*/
                        void 0, 
                        /*type*/
                        void 0, 
                        /*initializer*/
                        void 0));
                    }
                }
                if (canProduceDiagnostic && !suppressNewDiagnosticContexts) {
                    getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(input);
                }
                if (isTypeQueryNode(input)) {
                    checkEntityNameVisibility(input.exprName, enclosingDeclaration);
                }
                if (shouldEnterSuppressNewDiagnosticsContextContext) {
                    suppressNewDiagnosticContexts = true;
                }
                if (isProcessedComponent(input)) {
                    switch (input.kind) {
                        case 230 /* ExpressionWithTypeArguments */: {
                            if (isEntityName(input.expression) || isEntityNameExpression(input.expression)) {
                                checkEntityNameVisibility(input.expression, enclosingDeclaration);
                            }
                            const node = visitEachChild(input, visitDeclarationSubtree, context);
                            return cleanup(factory2.updateExpressionWithTypeArguments(node, node.expression, node.typeArguments));
                        }
                        case 180 /* TypeReference */: {
                            checkEntityNameVisibility(input.typeName, enclosingDeclaration);
                            const node = visitEachChild(input, visitDeclarationSubtree, context);
                            return cleanup(factory2.updateTypeReferenceNode(node, node.typeName, node.typeArguments));
                        }
                        case 177 /* ConstructSignature */:
                            return cleanup(factory2.updateConstructSignature(input, ensureTypeParams(input, input.typeParameters), updateParamsList(input, input.parameters), ensureType(input, input.type)));
                        case 173 /* Constructor */: {
                            const ctor = factory2.createConstructorDeclaration(
                            /*modifiers*/
                            ensureModifiers(input), updateParamsList(input, input.parameters, 0 /* None */), 
                            /*body*/
                            void 0);
                            return cleanup(ctor);
                        }
                        case 171 /* MethodDeclaration */: {
                            if (isPrivateIdentifier(input.name)) {
                                return cleanup(
                                /*returnValue*/
                                void 0);
                            }
                            const sig = factory2.createMethodDeclaration(ensureModifiers(input), 
                            /*asteriskToken*/
                            void 0, input.name, input.questionToken, ensureTypeParams(input, input.typeParameters), updateParamsList(input, input.parameters), ensureType(input, input.type), 
                            /*body*/
                            void 0);
                            return cleanup(sig);
                        }
                        case 174 /* GetAccessor */: {
                            if (isPrivateIdentifier(input.name)) {
                                return cleanup(
                                /*returnValue*/
                                void 0);
                            }
                            const accessorType = getTypeAnnotationFromAllAccessorDeclarations(input, resolver.getAllAccessorDeclarations(input));
                            return cleanup(factory2.updateGetAccessorDeclaration(input, ensureModifiers(input), input.name, updateAccessorParamsList(input, hasEffectiveModifier(input, 8 /* Private */)), ensureType(input, accessorType), 
                            /*body*/
                            void 0));
                        }
                        case 175 /* SetAccessor */: {
                            if (isPrivateIdentifier(input.name)) {
                                return cleanup(
                                /*returnValue*/
                                void 0);
                            }
                            return cleanup(factory2.updateSetAccessorDeclaration(input, ensureModifiers(input), input.name, updateAccessorParamsList(input, hasEffectiveModifier(input, 8 /* Private */)), 
                            /*body*/
                            void 0));
                        }
                        case 169 /* PropertyDeclaration */:
                            if (isPrivateIdentifier(input.name)) {
                                return cleanup(
                                /*returnValue*/
                                void 0);
                            }
                            return cleanup(factory2.updatePropertyDeclaration(input, ensureModifiers(input), input.name, input.questionToken, ensureType(input, input.type), ensureNoInitializer(input)));
                        case 168 /* PropertySignature */:
                            if (isPrivateIdentifier(input.name)) {
                                return cleanup(
                                /*returnValue*/
                                void 0);
                            }
                            return cleanup(factory2.updatePropertySignature(input, ensureModifiers(input), input.name, input.questionToken, ensureType(input, input.type)));
                        case 170 /* MethodSignature */: {
                            if (isPrivateIdentifier(input.name)) {
                                return cleanup(
                                /*returnValue*/
                                void 0);
                            }
                            return cleanup(factory2.updateMethodSignature(input, ensureModifiers(input), input.name, input.questionToken, ensureTypeParams(input, input.typeParameters), updateParamsList(input, input.parameters), ensureType(input, input.type)));
                        }
                        case 176 /* CallSignature */: {
                            return cleanup(factory2.updateCallSignature(input, ensureTypeParams(input, input.typeParameters), updateParamsList(input, input.parameters), ensureType(input, input.type)));
                        }
                        case 178 /* IndexSignature */: {
                            return cleanup(factory2.updateIndexSignature(input, ensureModifiers(input), updateParamsList(input, input.parameters), visitNode(input.type, visitDeclarationSubtree, isTypeNode) || factory2.createKeywordTypeNode(131 /* AnyKeyword */)));
                        }
                        case 257 /* VariableDeclaration */: {
                            if (isBindingPattern(input.name)) {
                                return recreateBindingPattern(input.name);
                            }
                            shouldEnterSuppressNewDiagnosticsContextContext = true;
                            suppressNewDiagnosticContexts = true;
                            return cleanup(factory2.updateVariableDeclaration(input, input.name, 
                            /*exclamationToken*/
                            void 0, ensureType(input, input.type), ensureNoInitializer(input)));
                        }
                        case 165 /* TypeParameter */: {
                            if (isPrivateMethodTypeParameter(input) && (input.default || input.constraint)) {
                                return cleanup(factory2.updateTypeParameterDeclaration(input, input.modifiers, input.name, 
                                /*constraint*/
                                void 0, 
                                /*defaultType*/
                                void 0));
                            }
                            return cleanup(visitEachChild(input, visitDeclarationSubtree, context));
                        }
                        case 191 /* ConditionalType */: {
                            const checkType = visitNode(input.checkType, visitDeclarationSubtree, isTypeNode);
                            const extendsType = visitNode(input.extendsType, visitDeclarationSubtree, isTypeNode);
                            const oldEnclosingDecl = enclosingDeclaration;
                            enclosingDeclaration = input.trueType;
                            const trueType = visitNode(input.trueType, visitDeclarationSubtree, isTypeNode);
                            enclosingDeclaration = oldEnclosingDecl;
                            const falseType = visitNode(input.falseType, visitDeclarationSubtree, isTypeNode);
                            Debug.assert(checkType);
                            Debug.assert(extendsType);
                            Debug.assert(trueType);
                            Debug.assert(falseType);
                            return cleanup(factory2.updateConditionalTypeNode(input, checkType, extendsType, trueType, falseType));
                        }
                        case 181 /* FunctionType */: {
                            return cleanup(factory2.updateFunctionTypeNode(input, visitNodes2(input.typeParameters, visitDeclarationSubtree, isTypeParameterDeclaration), updateParamsList(input, input.parameters), Debug.checkDefined(visitNode(input.type, visitDeclarationSubtree, isTypeNode))));
                        }
                        case 182 /* ConstructorType */: {
                            return cleanup(factory2.updateConstructorTypeNode(input, ensureModifiers(input), visitNodes2(input.typeParameters, visitDeclarationSubtree, isTypeParameterDeclaration), updateParamsList(input, input.parameters), Debug.checkDefined(visitNode(input.type, visitDeclarationSubtree, isTypeNode))));
                        }
                        case 202 /* ImportType */: {
                            if (!isLiteralImportTypeNode(input))
                                return cleanup(input);
                            return cleanup(factory2.updateImportTypeNode(input, factory2.updateLiteralTypeNode(input.argument, rewriteModuleSpecifier(input, input.argument.literal)), input.assertions, input.qualifier, visitNodes2(input.typeArguments, visitDeclarationSubtree, isTypeNode), input.isTypeOf));
                        }
                        default:
                            Debug.assertNever(input, `Attempted to process unhandled node kind: ${Debug.formatSyntaxKind(input.kind)}`);
                    }
                }
                if (isTupleTypeNode(input) && getLineAndCharacterOfPosition(currentSourceFile, input.pos).line === getLineAndCharacterOfPosition(currentSourceFile, input.end).line) {
                    setEmitFlags(input, 1 /* SingleLine */);
                }
                return cleanup(visitEachChild(input, visitDeclarationSubtree, context));
                function cleanup(returnValue) {
                    if (returnValue && canProduceDiagnostic && hasDynamicName(input)) {
                        checkName(input);
                    }
                    if (isEnclosingDeclaration(input)) {
                        enclosingDeclaration = previousEnclosingDeclaration;
                    }
                    if (canProduceDiagnostic && !suppressNewDiagnosticContexts) {
                        getSymbolAccessibilityDiagnostic = oldDiag;
                    }
                    if (shouldEnterSuppressNewDiagnosticsContextContext) {
                        suppressNewDiagnosticContexts = oldWithinObjectLiteralType;
                    }
                    if (returnValue === input) {
                        return returnValue;
                    }
                    return returnValue && setOriginalNode(preserveJsDoc(returnValue, input), input);
                }
            }