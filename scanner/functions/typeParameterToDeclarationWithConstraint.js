function typeParameterToDeclarationWithConstraint(type, context, constraintNode) {
                    const savedContextFlags = context.flags;
                    context.flags &= ~512 /* WriteTypeParametersInQualifiedName */;
                    const modifiers = factory.createModifiersFromModifierFlags(getTypeParameterModifiers(type));
                    const name = typeParameterToName(type, context);
                    const defaultParameter = getDefaultFromTypeParameter(type);
                    const defaultParameterNode = defaultParameter && typeToTypeNodeHelper(defaultParameter, context);
                    context.flags = savedContextFlags;
                    return factory.createTypeParameterDeclaration(modifiers, name, constraintNode, defaultParameterNode);
                }