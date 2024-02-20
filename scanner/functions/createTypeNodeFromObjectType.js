function createTypeNodeFromObjectType(type2) {
                        if (isGenericMappedType(type2) || type2.containsError) {
                            return createMappedTypeNodeFromType(type2);
                        }
                        const resolved = resolveStructuredTypeMembers(type2);
                        if (!resolved.properties.length && !resolved.indexInfos.length) {
                            if (!resolved.callSignatures.length && !resolved.constructSignatures.length) {
                                context.approximateLength += 2;
                                return setEmitFlags(factory.createTypeLiteralNode(
                                /*members*/
                                void 0), 1 /* SingleLine */);
                            }
                            if (resolved.callSignatures.length === 1 && !resolved.constructSignatures.length) {
                                const signature = resolved.callSignatures[0];
                                const signatureNode = signatureToSignatureDeclarationHelper(signature, 181 /* FunctionType */, context);
                                return signatureNode;
                            }
                            if (resolved.constructSignatures.length === 1 && !resolved.callSignatures.length) {
                                const signature = resolved.constructSignatures[0];
                                const signatureNode = signatureToSignatureDeclarationHelper(signature, 182 /* ConstructorType */, context);
                                return signatureNode;
                            }
                        }
                        const abstractSignatures = filter(resolved.constructSignatures, (signature) => !!(signature.flags & 4 /* Abstract */));
                        if (some(abstractSignatures)) {
                            const types = map(abstractSignatures, getOrCreateTypeFromSignature);
                            const typeElementCount = resolved.callSignatures.length + (resolved.constructSignatures.length - abstractSignatures.length) + resolved.indexInfos.length + // exclude `prototype` when writing a class expression as a type literal, as per
                                // the logic in `createTypeNodesFromResolvedType`.
                                (context.flags & 2048 /* WriteClassExpressionAsTypeLiteral */ ? countWhere(resolved.properties, (p) => !(p.flags & 4194304 /* Prototype */)) : length(resolved.properties));
                            if (typeElementCount) {
                                types.push(getResolvedTypeWithoutAbstractConstructSignatures(resolved));
                            }
                            return typeToTypeNodeHelper(getIntersectionType(types), context);
                        }
                        const savedFlags = context.flags;
                        context.flags |= 4194304 /* InObjectTypeLiteral */;
                        const members = createTypeNodesFromResolvedType(resolved);
                        context.flags = savedFlags;
                        const typeLiteralNode = factory.createTypeLiteralNode(members);
                        context.approximateLength += 2;
                        setEmitFlags(typeLiteralNode, context.flags & 1024 /* MultilineObjectLiterals */ ? 0 : 1 /* SingleLine */);
                        return typeLiteralNode;
                    }