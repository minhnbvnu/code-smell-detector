function symbolToParameterDeclaration(parameterSymbol, context, preserveModifierFlags, privateSymbolVisitor, bundledImports) {
                    let parameterDeclaration = getDeclarationOfKind(parameterSymbol, 166 /* Parameter */);
                    if (!parameterDeclaration && !isTransientSymbol(parameterSymbol)) {
                        parameterDeclaration = getDeclarationOfKind(parameterSymbol, 344 /* JSDocParameterTag */);
                    }
                    let parameterType = getTypeOfSymbol(parameterSymbol);
                    if (parameterDeclaration && isRequiredInitializedParameter(parameterDeclaration)) {
                        parameterType = getOptionalType(parameterType);
                    }
                    const parameterTypeNode = serializeTypeForDeclaration(context, parameterType, parameterSymbol, context.enclosingDeclaration, privateSymbolVisitor, bundledImports);
                    const modifiers = !(context.flags & 8192 /* OmitParameterModifiers */) && preserveModifierFlags && parameterDeclaration && canHaveModifiers(parameterDeclaration) ? map(getModifiers(parameterDeclaration), factory.cloneNode) : void 0;
                    const isRest = parameterDeclaration && isRestParameter(parameterDeclaration) || getCheckFlags(parameterSymbol) & 32768 /* RestParameter */;
                    const dotDotDotToken = isRest ? factory.createToken(25 /* DotDotDotToken */) : void 0;
                    const name = parameterDeclaration ? parameterDeclaration.name ? parameterDeclaration.name.kind === 79 /* Identifier */ ? setEmitFlags(factory.cloneNode(parameterDeclaration.name), 33554432 /* NoAsciiEscaping */) : parameterDeclaration.name.kind === 163 /* QualifiedName */ ? setEmitFlags(factory.cloneNode(parameterDeclaration.name.right), 33554432 /* NoAsciiEscaping */) : cloneBindingName(parameterDeclaration.name) : symbolName(parameterSymbol) : symbolName(parameterSymbol);
                    const isOptional = parameterDeclaration && isOptionalParameter(parameterDeclaration) || getCheckFlags(parameterSymbol) & 16384 /* OptionalParameter */;
                    const questionToken = isOptional ? factory.createToken(57 /* QuestionToken */) : void 0;
                    const parameterNode = factory.createParameterDeclaration(modifiers, dotDotDotToken, name, questionToken, parameterTypeNode, 
                    /*initializer*/
                    void 0);
                    context.approximateLength += symbolName(parameterSymbol).length + 3;
                    return parameterNode;
                    function cloneBindingName(node) {
                        return elideInitializerAndSetEmitFlags(node);
                        function elideInitializerAndSetEmitFlags(node2) {
                            if (context.tracker.canTrackSymbol && isComputedPropertyName(node2) && isLateBindableName(node2)) {
                                trackComputedName(node2.expression, context.enclosingDeclaration, context);
                            }
                            let visited = visitEachChild(node2, elideInitializerAndSetEmitFlags, nullTransformationContext, 
                            /*nodesVisitor*/
                            void 0, elideInitializerAndSetEmitFlags);
                            if (isBindingElement(visited)) {
                                visited = factory.updateBindingElement(visited, visited.dotDotDotToken, visited.propertyName, visited.name, 
                                /*initializer*/
                                void 0);
                            }
                            if (!nodeIsSynthesized(visited)) {
                                visited = factory.cloneNode(visited);
                            }
                            return setEmitFlags(visited, 1 /* SingleLine */ | 33554432 /* NoAsciiEscaping */);
                        }
                    }
                }