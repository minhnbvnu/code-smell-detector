function getIntendedTypeFromJSDocTypeReference(node) {
                if (isIdentifier(node.typeName)) {
                    const typeArgs = node.typeArguments;
                    switch (node.typeName.escapedText) {
                        case "String":
                            checkNoTypeArguments(node);
                            return stringType;
                        case "Number":
                            checkNoTypeArguments(node);
                            return numberType;
                        case "Boolean":
                            checkNoTypeArguments(node);
                            return booleanType;
                        case "Void":
                            checkNoTypeArguments(node);
                            return voidType;
                        case "Undefined":
                            checkNoTypeArguments(node);
                            return undefinedType;
                        case "Null":
                            checkNoTypeArguments(node);
                            return nullType;
                        case "Function":
                        case "function":
                            checkNoTypeArguments(node);
                            return globalFunctionType;
                        case "array":
                            return (!typeArgs || !typeArgs.length) && !noImplicitAny ? anyArrayType : void 0;
                        case "promise":
                            return (!typeArgs || !typeArgs.length) && !noImplicitAny ? createPromiseType(anyType) : void 0;
                        case "Object":
                            if (typeArgs && typeArgs.length === 2) {
                                if (isJSDocIndexSignature(node)) {
                                    const indexed = getTypeFromTypeNode(typeArgs[0]);
                                    const target = getTypeFromTypeNode(typeArgs[1]);
                                    const indexInfo = indexed === stringType || indexed === numberType ? [createIndexInfo(indexed, target, 
                                        /*isReadonly*/
                                        false)] : emptyArray;
                                    return createAnonymousType(void 0, emptySymbols, emptyArray, emptyArray, indexInfo);
                                }
                                return anyType;
                            }
                            checkNoTypeArguments(node);
                            return !noImplicitAny ? anyType : void 0;
                    }
                }
            }