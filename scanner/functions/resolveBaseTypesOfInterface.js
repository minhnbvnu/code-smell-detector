function resolveBaseTypesOfInterface(type) {
                type.resolvedBaseTypes = type.resolvedBaseTypes || emptyArray;
                if (type.symbol.declarations) {
                    for (const declaration of type.symbol.declarations) {
                        if (declaration.kind === 261 /* InterfaceDeclaration */ && getInterfaceBaseTypeNodes(declaration)) {
                            for (const node of getInterfaceBaseTypeNodes(declaration)) {
                                const baseType = getReducedType(getTypeFromTypeNode(node));
                                if (!isErrorType(baseType)) {
                                    if (isValidBaseType(baseType)) {
                                        if (type !== baseType && !hasBaseType(baseType, type)) {
                                            if (type.resolvedBaseTypes === emptyArray) {
                                                type.resolvedBaseTypes = [baseType];
                                            }
                                            else {
                                                type.resolvedBaseTypes.push(baseType);
                                            }
                                        }
                                        else {
                                            reportCircularBaseType(declaration, type);
                                        }
                                    }
                                    else {
                                        error(node, Diagnostics.An_interface_can_only_extend_an_object_type_or_intersection_of_object_types_with_statically_known_members);
                                    }
                                }
                            }
                        }
                    }
                }
            }