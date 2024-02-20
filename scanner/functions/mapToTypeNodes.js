function mapToTypeNodes(types, context, isBareList) {
                    if (some(types)) {
                        if (checkTruncationLength(context)) {
                            if (!isBareList) {
                                return [factory.createTypeReferenceNode("...", 
                                    /*typeArguments*/
                                    void 0)];
                            }
                            else if (types.length > 2) {
                                return [
                                    typeToTypeNodeHelper(types[0], context),
                                    factory.createTypeReferenceNode(`... ${types.length - 2} more ...`, 
                                    /*typeArguments*/
                                    void 0),
                                    typeToTypeNodeHelper(types[types.length - 1], context)
                                ];
                            }
                        }
                        const mayHaveNameCollisions = !(context.flags & 64 /* UseFullyQualifiedType */);
                        const seenNames = mayHaveNameCollisions ? createUnderscoreEscapedMultiMap() : void 0;
                        const result = [];
                        let i = 0;
                        for (const type of types) {
                            i++;
                            if (checkTruncationLength(context) && i + 2 < types.length - 1) {
                                result.push(factory.createTypeReferenceNode(`... ${types.length - i} more ...`, 
                                /*typeArguments*/
                                void 0));
                                const typeNode2 = typeToTypeNodeHelper(types[types.length - 1], context);
                                if (typeNode2) {
                                    result.push(typeNode2);
                                }
                                break;
                            }
                            context.approximateLength += 2;
                            const typeNode = typeToTypeNodeHelper(type, context);
                            if (typeNode) {
                                result.push(typeNode);
                                if (seenNames && isIdentifierTypeReference(typeNode)) {
                                    seenNames.add(typeNode.typeName.escapedText, [type, result.length - 1]);
                                }
                            }
                        }
                        if (seenNames) {
                            const saveContextFlags = context.flags;
                            context.flags |= 64 /* UseFullyQualifiedType */;
                            seenNames.forEach((types2) => {
                                if (!arrayIsHomogeneous(types2, ([a], [b]) => typesAreSameReference(a, b))) {
                                    for (const [type, resultIndex] of types2) {
                                        result[resultIndex] = typeToTypeNodeHelper(type, context);
                                    }
                                }
                            });
                            context.flags = saveContextFlags;
                        }
                        return result;
                    }
                }