function getLegacyDecoratorCallSignature(decorator) {
                const { parent: parent2 } = decorator;
                const links = getNodeLinks(parent2);
                if (!links.decoratorSignature) {
                    links.decoratorSignature = anySignature;
                    switch (parent2.kind) {
                        case 260 /* ClassDeclaration */:
                        case 228 /* ClassExpression */: {
                            const node = parent2;
                            const targetType = getTypeOfSymbol(getSymbolOfDeclaration(node));
                            const targetParam = createParameter("target", targetType);
                            links.decoratorSignature = createCallSignature(
                            /*typeParameters*/
                            void 0, 
                            /*thisParameter*/
                            void 0, [targetParam], getUnionType([targetType, voidType]));
                            break;
                        }
                        case 166 /* Parameter */: {
                            const node = parent2;
                            if (!isConstructorDeclaration(node.parent) && !(isMethodDeclaration(node.parent) || isSetAccessorDeclaration(node.parent) && isClassLike(node.parent.parent))) {
                                break;
                            }
                            if (getThisParameter(node.parent) === node) {
                                break;
                            }
                            const index = getThisParameter(node.parent) ? node.parent.parameters.indexOf(node) - 1 : node.parent.parameters.indexOf(node);
                            Debug.assert(index >= 0);
                            const targetType = isConstructorDeclaration(node.parent) ? getTypeOfSymbol(getSymbolOfDeclaration(node.parent.parent)) : getParentTypeOfClassElement(node.parent);
                            const keyType = isConstructorDeclaration(node.parent) ? undefinedType : getClassElementPropertyKeyType(node.parent);
                            const indexType = getNumberLiteralType(index);
                            const targetParam = createParameter("target", targetType);
                            const keyParam = createParameter("propertyKey", keyType);
                            const indexParam = createParameter("parameterIndex", indexType);
                            links.decoratorSignature = createCallSignature(
                            /*typeParameters*/
                            void 0, 
                            /*thisParameter*/
                            void 0, [targetParam, keyParam, indexParam], voidType);
                            break;
                        }
                        case 171 /* MethodDeclaration */:
                        case 174 /* GetAccessor */:
                        case 175 /* SetAccessor */:
                        case 169 /* PropertyDeclaration */: {
                            const node = parent2;
                            if (!isClassLike(node.parent))
                                break;
                            const targetType = getParentTypeOfClassElement(node);
                            const targetParam = createParameter("target", targetType);
                            const keyType = getClassElementPropertyKeyType(node);
                            const keyParam = createParameter("propertyKey", keyType);
                            const returnType = isPropertyDeclaration(node) ? voidType : createTypedPropertyDescriptorType(getTypeOfNode(node));
                            const hasPropDesc = languageVersion !== 0 /* ES3 */ && (!isPropertyDeclaration(parent2) || hasAccessorModifier(parent2));
                            if (hasPropDesc) {
                                const descriptorType = createTypedPropertyDescriptorType(getTypeOfNode(node));
                                const descriptorParam = createParameter("descriptor", descriptorType);
                                links.decoratorSignature = createCallSignature(
                                /*typeParameters*/
                                void 0, 
                                /*thisParameter*/
                                void 0, [targetParam, keyParam, descriptorParam], getUnionType([returnType, voidType]));
                            }
                            else {
                                links.decoratorSignature = createCallSignature(
                                /*typeParameters*/
                                void 0, 
                                /*thisParameter*/
                                void 0, [targetParam, keyParam], getUnionType([returnType, voidType]));
                            }
                            break;
                        }
                    }
                }
                return links.decoratorSignature === anySignature ? void 0 : links.decoratorSignature;
            }