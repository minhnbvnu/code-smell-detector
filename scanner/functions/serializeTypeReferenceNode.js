function serializeTypeReferenceNode(node) {
                const kind = resolver.getTypeReferenceSerializationKind(node.typeName, currentNameScope != null ? currentNameScope : currentLexicalScope);
                switch (kind) {
                    case 0 /* Unknown */:
                        if (findAncestor(node, (n) => n.parent && isConditionalTypeNode(n.parent) && (n.parent.trueType === n || n.parent.falseType === n))) {
                            return factory.createIdentifier("Object");
                        }
                        const serialized = serializeEntityNameAsExpressionFallback(node.typeName);
                        const temp = factory.createTempVariable(hoistVariableDeclaration);
                        return factory.createConditionalExpression(factory.createTypeCheck(factory.createAssignment(temp, serialized), "function"), 
                        /*questionToken*/
                        void 0, temp, 
                        /*colonToken*/
                        void 0, factory.createIdentifier("Object"));
                    case 1 /* TypeWithConstructSignatureAndValue */:
                        return serializeEntityNameAsExpression(node.typeName);
                    case 2 /* VoidNullableOrNeverType */:
                        return factory.createVoidZero();
                    case 4 /* BigIntLikeType */:
                        return getGlobalConstructor("BigInt", 7 /* ES2020 */);
                    case 6 /* BooleanType */:
                        return factory.createIdentifier("Boolean");
                    case 3 /* NumberLikeType */:
                        return factory.createIdentifier("Number");
                    case 5 /* StringLikeType */:
                        return factory.createIdentifier("String");
                    case 7 /* ArrayLikeType */:
                        return factory.createIdentifier("Array");
                    case 8 /* ESSymbolType */:
                        return getGlobalConstructor("Symbol", 2 /* ES2015 */);
                    case 10 /* TypeWithCallSignature */:
                        return factory.createIdentifier("Function");
                    case 9 /* Promise */:
                        return factory.createIdentifier("Promise");
                    case 11 /* ObjectType */:
                        return factory.createIdentifier("Object");
                    default:
                        return Debug.assertNever(kind);
                }
            }