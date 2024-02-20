function isThislessFunctionLikeDeclaration(node) {
                const returnType = getEffectiveReturnTypeNode(node);
                const typeParameters = getEffectiveTypeParameterDeclarations(node);
                return (node.kind === 173 /* Constructor */ || !!returnType && isThislessType(returnType)) && node.parameters.every(isThislessVariableLikeDeclaration) && typeParameters.every(isThislessTypeParameter);
            }