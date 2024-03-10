function checkDecorators(node) {
                if (!canHaveDecorators(node) || !hasDecorators(node) || !node.modifiers || !nodeCanBeDecorated(legacyDecorators, node, node.parent, node.parent.parent)) {
                    return;
                }
                const firstDecorator = find(node.modifiers, isDecorator);
                if (!firstDecorator) {
                    return;
                }
                if (legacyDecorators) {
                    checkExternalEmitHelpers(firstDecorator, 8 /* Decorate */);
                    if (node.kind === 166 /* Parameter */) {
                        checkExternalEmitHelpers(firstDecorator, 32 /* Param */);
                    }
                }
                else if (languageVersion < 99 /* ESNext */) {
                    checkExternalEmitHelpers(firstDecorator, 8 /* ESDecorateAndRunInitializers */);
                    if (isClassDeclaration(node)) {
                        if (!node.name) {
                            checkExternalEmitHelpers(firstDecorator, 8388608 /* SetFunctionName */);
                        }
                        else {
                            const member = getFirstTransformableStaticClassElement(node);
                            if (member) {
                                checkExternalEmitHelpers(firstDecorator, 8388608 /* SetFunctionName */);
                            }
                        }
                    }
                    else if (!isClassExpression(node)) {
                        if (isPrivateIdentifier(node.name) && (isMethodDeclaration(node) || isAccessor(node) || isAutoAccessorPropertyDeclaration(node))) {
                            checkExternalEmitHelpers(firstDecorator, 8388608 /* SetFunctionName */);
                        }
                        if (isComputedPropertyName(node.name)) {
                            checkExternalEmitHelpers(firstDecorator, 16777216 /* PropKey */);
                        }
                    }
                }
                if (compilerOptions.emitDecoratorMetadata) {
                    checkExternalEmitHelpers(firstDecorator, 16 /* Metadata */);
                    switch (node.kind) {
                        case 260 /* ClassDeclaration */:
                            const constructor = getFirstConstructorWithBody(node);
                            if (constructor) {
                                for (const parameter of constructor.parameters) {
                                    markDecoratorMedataDataTypeNodeAsReferenced(getParameterTypeNodeForDecoratorCheck(parameter));
                                }
                            }
                            break;
                        case 174 /* GetAccessor */:
                        case 175 /* SetAccessor */:
                            const otherKind = node.kind === 174 /* GetAccessor */ ? 175 /* SetAccessor */ : 174 /* GetAccessor */;
                            const otherAccessor = getDeclarationOfKind(getSymbolOfDeclaration(node), otherKind);
                            markDecoratorMedataDataTypeNodeAsReferenced(getAnnotatedAccessorTypeNode(node) || otherAccessor && getAnnotatedAccessorTypeNode(otherAccessor));
                            break;
                        case 171 /* MethodDeclaration */:
                            for (const parameter of node.parameters) {
                                markDecoratorMedataDataTypeNodeAsReferenced(getParameterTypeNodeForDecoratorCheck(parameter));
                            }
                            markDecoratorMedataDataTypeNodeAsReferenced(getEffectiveReturnTypeNode(node));
                            break;
                        case 169 /* PropertyDeclaration */:
                            markDecoratorMedataDataTypeNodeAsReferenced(getEffectiveTypeAnnotationNode(node));
                            break;
                        case 166 /* Parameter */:
                            markDecoratorMedataDataTypeNodeAsReferenced(getParameterTypeNodeForDecoratorCheck(node));
                            const containingSignature = node.parent;
                            for (const parameter of containingSignature.parameters) {
                                markDecoratorMedataDataTypeNodeAsReferenced(getParameterTypeNodeForDecoratorCheck(parameter));
                            }
                            break;
                    }
                }
                for (const modifier of node.modifiers) {
                    if (isDecorator(modifier)) {
                        checkDecorator(modifier);
                    }
                }
            }