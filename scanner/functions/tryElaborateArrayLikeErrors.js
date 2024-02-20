function tryElaborateArrayLikeErrors(source2, target2, reportErrors2) {
                    if (isTupleType(source2)) {
                        if (source2.target.readonly && isMutableArrayOrTuple(target2)) {
                            if (reportErrors2) {
                                reportError(Diagnostics.The_type_0_is_readonly_and_cannot_be_assigned_to_the_mutable_type_1, typeToString(source2), typeToString(target2));
                            }
                            return false;
                        }
                        return isArrayOrTupleType(target2);
                    }
                    if (isReadonlyArrayType(source2) && isMutableArrayOrTuple(target2)) {
                        if (reportErrors2) {
                            reportError(Diagnostics.The_type_0_is_readonly_and_cannot_be_assigned_to_the_mutable_type_1, typeToString(source2), typeToString(target2));
                        }
                        return false;
                    }
                    if (isTupleType(target2)) {
                        return isArrayType(source2);
                    }
                    return true;
                }