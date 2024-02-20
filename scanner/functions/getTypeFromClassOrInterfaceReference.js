function getTypeFromClassOrInterfaceReference(node, symbol) {
                const type = getDeclaredTypeOfSymbol(getMergedSymbol(symbol));
                const typeParameters = type.localTypeParameters;
                if (typeParameters) {
                    const numTypeArguments = length(node.typeArguments);
                    const minTypeArgumentCount = getMinTypeArgumentCount(typeParameters);
                    const isJs = isInJSFile(node);
                    const isJsImplicitAny = !noImplicitAny && isJs;
                    if (!isJsImplicitAny && (numTypeArguments < minTypeArgumentCount || numTypeArguments > typeParameters.length)) {
                        const missingAugmentsTag = isJs && isExpressionWithTypeArguments(node) && !isJSDocAugmentsTag(node.parent);
                        const diag2 = minTypeArgumentCount === typeParameters.length ? missingAugmentsTag ? Diagnostics.Expected_0_type_arguments_provide_these_with_an_extends_tag : Diagnostics.Generic_type_0_requires_1_type_argument_s : missingAugmentsTag ? Diagnostics.Expected_0_1_type_arguments_provide_these_with_an_extends_tag : Diagnostics.Generic_type_0_requires_between_1_and_2_type_arguments;
                        const typeStr = typeToString(type, 
                        /*enclosingDeclaration*/
                        void 0, 2 /* WriteArrayAsGenericType */);
                        error(node, diag2, typeStr, minTypeArgumentCount, typeParameters.length);
                        if (!isJs) {
                            return errorType;
                        }
                    }
                    if (node.kind === 180 /* TypeReference */ && isDeferredTypeReferenceNode(node, length(node.typeArguments) !== typeParameters.length)) {
                        return createDeferredTypeReference(type, node, 
                        /*mapper*/
                        void 0);
                    }
                    const typeArguments = concatenate(type.outerTypeParameters, fillMissingTypeArguments(typeArgumentsFromTypeReferenceNode(node), typeParameters, minTypeArgumentCount, isJs));
                    return createTypeReference(type, typeArguments);
                }
                return checkNoTypeArguments(node, symbol) ? type : errorType;
            }