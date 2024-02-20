function getTypeArgumentsFromNodes(typeArgumentNodes, typeParameters, isJs) {
                const typeArguments = typeArgumentNodes.map(getTypeOfNode);
                while (typeArguments.length > typeParameters.length) {
                    typeArguments.pop();
                }
                while (typeArguments.length < typeParameters.length) {
                    typeArguments.push(getDefaultFromTypeParameter(typeParameters[typeArguments.length]) || getConstraintOfTypeParameter(typeParameters[typeArguments.length]) || getDefaultTypeArgumentType(isJs));
                }
                return typeArguments;
            }