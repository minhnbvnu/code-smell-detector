function errorIfWritingToReadonlyIndex(indexInfo) {
                    if (indexInfo && indexInfo.isReadonly && accessExpression && (isAssignmentTarget(accessExpression) || isDeleteTarget(accessExpression))) {
                        error(accessExpression, Diagnostics.Index_signature_in_type_0_only_permits_reading, typeToString(objectType));
                    }
                }