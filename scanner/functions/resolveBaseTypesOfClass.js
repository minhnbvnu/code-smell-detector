function resolveBaseTypesOfClass(type) {
                type.resolvedBaseTypes = resolvingEmptyArray;
                const baseConstructorType = getApparentType(getBaseConstructorTypeOfClass(type));
                if (!(baseConstructorType.flags & (524288 /* Object */ | 2097152 /* Intersection */ | 1 /* Any */))) {
                    return type.resolvedBaseTypes = emptyArray;
                }
                const baseTypeNode = getBaseTypeNodeOfClass(type);
                let baseType;
                const originalBaseType = baseConstructorType.symbol ? getDeclaredTypeOfSymbol(baseConstructorType.symbol) : void 0;
                if (baseConstructorType.symbol && baseConstructorType.symbol.flags & 32 /* Class */ && areAllOuterTypeParametersApplied(originalBaseType)) {
                    baseType = getTypeFromClassOrInterfaceReference(baseTypeNode, baseConstructorType.symbol);
                }
                else if (baseConstructorType.flags & 1 /* Any */) {
                    baseType = baseConstructorType;
                }
                else {
                    const constructors = getInstantiatedConstructorsForTypeArguments(baseConstructorType, baseTypeNode.typeArguments, baseTypeNode);
                    if (!constructors.length) {
                        error(baseTypeNode.expression, Diagnostics.No_base_constructor_has_the_specified_number_of_type_arguments);
                        return type.resolvedBaseTypes = emptyArray;
                    }
                    baseType = getReturnTypeOfSignature(constructors[0]);
                }
                if (isErrorType(baseType)) {
                    return type.resolvedBaseTypes = emptyArray;
                }
                const reducedBaseType = getReducedType(baseType);
                if (!isValidBaseType(reducedBaseType)) {
                    const elaboration = elaborateNeverIntersection(
                    /*errorInfo*/
                    void 0, baseType);
                    const diagnostic = chainDiagnosticMessages(elaboration, Diagnostics.Base_constructor_return_type_0_is_not_an_object_type_or_intersection_of_object_types_with_statically_known_members, typeToString(reducedBaseType));
                    diagnostics.add(createDiagnosticForNodeFromMessageChain(getSourceFileOfNode(baseTypeNode.expression), baseTypeNode.expression, diagnostic));
                    return type.resolvedBaseTypes = emptyArray;
                }
                if (type === reducedBaseType || hasBaseType(reducedBaseType, type)) {
                    error(type.symbol.valueDeclaration, Diagnostics.Type_0_recursively_references_itself_as_a_base_type, typeToString(type, 
                    /*enclosingDeclaration*/
                    void 0, 2 /* WriteArrayAsGenericType */));
                    return type.resolvedBaseTypes = emptyArray;
                }
                if (type.resolvedBaseTypes === resolvingEmptyArray) {
                    type.members = void 0;
                }
                return type.resolvedBaseTypes = [reducedBaseType];
            }