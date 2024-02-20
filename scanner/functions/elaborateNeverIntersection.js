function elaborateNeverIntersection(errorInfo, type) {
                if (type.flags & 2097152 /* Intersection */ && getObjectFlags(type) & 33554432 /* IsNeverIntersection */) {
                    const neverProp = find(getPropertiesOfUnionOrIntersectionType(type), isDiscriminantWithNeverType);
                    if (neverProp) {
                        return chainDiagnosticMessages(errorInfo, Diagnostics.The_intersection_0_was_reduced_to_never_because_property_1_has_conflicting_types_in_some_constituents, typeToString(type, 
                        /*enclosingDeclaration*/
                        void 0, 536870912 /* NoTypeReduction */), symbolToString(neverProp));
                    }
                    const privateProp = find(getPropertiesOfUnionOrIntersectionType(type), isConflictingPrivateProperty);
                    if (privateProp) {
                        return chainDiagnosticMessages(errorInfo, Diagnostics.The_intersection_0_was_reduced_to_never_because_property_1_exists_in_multiple_constituents_and_is_private_in_some, typeToString(type, 
                        /*enclosingDeclaration*/
                        void 0, 536870912 /* NoTypeReduction */), symbolToString(privateProp));
                    }
                }
                return errorInfo;
            }