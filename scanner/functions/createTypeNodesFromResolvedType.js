function createTypeNodesFromResolvedType(resolvedType) {
                        if (checkTruncationLength(context)) {
                            return [factory.createPropertySignature(
                                /*modifiers*/
                                void 0, "...", 
                                /*questionToken*/
                                void 0, 
                                /*type*/
                                void 0)];
                        }
                        const typeElements = [];
                        for (const signature of resolvedType.callSignatures) {
                            typeElements.push(signatureToSignatureDeclarationHelper(signature, 176 /* CallSignature */, context));
                        }
                        for (const signature of resolvedType.constructSignatures) {
                            if (signature.flags & 4 /* Abstract */)
                                continue;
                            typeElements.push(signatureToSignatureDeclarationHelper(signature, 177 /* ConstructSignature */, context));
                        }
                        for (const info of resolvedType.indexInfos) {
                            typeElements.push(indexInfoToIndexSignatureDeclarationHelper(info, context, resolvedType.objectFlags & 1024 /* ReverseMapped */ ? createElidedInformationPlaceholder(context) : void 0));
                        }
                        const properties = resolvedType.properties;
                        if (!properties) {
                            return typeElements;
                        }
                        let i = 0;
                        for (const propertySymbol of properties) {
                            i++;
                            if (context.flags & 2048 /* WriteClassExpressionAsTypeLiteral */) {
                                if (propertySymbol.flags & 4194304 /* Prototype */) {
                                    continue;
                                }
                                if (getDeclarationModifierFlagsFromSymbol(propertySymbol) & (8 /* Private */ | 16 /* Protected */) && context.tracker.reportPrivateInBaseOfClassExpression) {
                                    context.tracker.reportPrivateInBaseOfClassExpression(unescapeLeadingUnderscores(propertySymbol.escapedName));
                                }
                            }
                            if (checkTruncationLength(context) && i + 2 < properties.length - 1) {
                                typeElements.push(factory.createPropertySignature(
                                /*modifiers*/
                                void 0, `... ${properties.length - i} more ...`, 
                                /*questionToken*/
                                void 0, 
                                /*type*/
                                void 0));
                                addPropertyToElementList(properties[properties.length - 1], context, typeElements);
                                break;
                            }
                            addPropertyToElementList(propertySymbol, context, typeElements);
                        }
                        return typeElements.length ? typeElements : void 0;
                    }