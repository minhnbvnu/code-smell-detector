function getTypeArgumentConstraint(node) {
                const typeReferenceNode = tryCast(node.parent, isTypeReferenceType);
                if (!typeReferenceNode)
                    return void 0;
                const typeParameters = getTypeParametersForTypeReferenceOrImport(typeReferenceNode);
                if (!typeParameters)
                    return void 0;
                const constraint = getConstraintOfTypeParameter(typeParameters[typeReferenceNode.typeArguments.indexOf(node)]);
                return constraint && instantiateType(constraint, createTypeMapper(typeParameters, getEffectiveTypeArguments2(typeReferenceNode, typeParameters)));
            }