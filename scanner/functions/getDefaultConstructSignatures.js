function getDefaultConstructSignatures(classType) {
                const baseConstructorType = getBaseConstructorTypeOfClass(classType);
                const baseSignatures = getSignaturesOfType(baseConstructorType, 1 /* Construct */);
                const declaration = getClassLikeDeclarationOfSymbol(classType.symbol);
                const isAbstract = !!declaration && hasSyntacticModifier(declaration, 256 /* Abstract */);
                if (baseSignatures.length === 0) {
                    return [createSignature(void 0, classType.localTypeParameters, void 0, emptyArray, classType, 
                        /*resolvedTypePredicate*/
                        void 0, 0, isAbstract ? 4 /* Abstract */ : 0 /* None */)];
                }
                const baseTypeNode = getBaseTypeNodeOfClass(classType);
                const isJavaScript = isInJSFile(baseTypeNode);
                const typeArguments = typeArgumentsFromTypeReferenceNode(baseTypeNode);
                const typeArgCount = length(typeArguments);
                const result = [];
                for (const baseSig of baseSignatures) {
                    const minTypeArgumentCount = getMinTypeArgumentCount(baseSig.typeParameters);
                    const typeParamCount = length(baseSig.typeParameters);
                    if (isJavaScript || typeArgCount >= minTypeArgumentCount && typeArgCount <= typeParamCount) {
                        const sig = typeParamCount ? createSignatureInstantiation(baseSig, fillMissingTypeArguments(typeArguments, baseSig.typeParameters, minTypeArgumentCount, isJavaScript)) : cloneSignature(baseSig);
                        sig.typeParameters = classType.localTypeParameters;
                        sig.resolvedReturnType = classType;
                        sig.flags = isAbstract ? sig.flags | 4 /* Abstract */ : sig.flags & ~4 /* Abstract */;
                        result.push(sig);
                    }
                }
                return result;
            }