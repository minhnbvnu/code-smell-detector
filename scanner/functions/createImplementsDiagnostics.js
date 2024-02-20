function createImplementsDiagnostics(typeRefNode) {
                    return () => {
                        const t = getReducedType(getTypeFromTypeNode(typeRefNode));
                        if (!isErrorType(t)) {
                            if (isValidBaseType(t)) {
                                const genericDiag = t.symbol && t.symbol.flags & 32 /* Class */ ? Diagnostics.Class_0_incorrectly_implements_class_1_Did_you_mean_to_extend_1_and_inherit_its_members_as_a_subclass : Diagnostics.Class_0_incorrectly_implements_interface_1;
                                const baseWithThis = getTypeWithThisArgument(t, type.thisType);
                                if (!checkTypeAssignableTo(typeWithThis, baseWithThis, 
                                /*errorNode*/
                                void 0)) {
                                    issueMemberSpecificError(node, typeWithThis, baseWithThis, genericDiag);
                                }
                            }
                            else {
                                error(typeRefNode, Diagnostics.A_class_can_only_implement_an_object_type_or_intersection_of_object_types_with_statically_known_members);
                            }
                        }
                    };
                }