function checkElementAccessExpression(node, exprType, checkMode) {
                const objectType = getAssignmentTargetKind(node) !== 0 /* None */ || isMethodAccessForCall(node) ? getWidenedType(exprType) : exprType;
                const indexExpression = node.argumentExpression;
                const indexType = checkExpression(indexExpression);
                if (isErrorType(objectType) || objectType === silentNeverType) {
                    return objectType;
                }
                if (isConstEnumObjectType(objectType) && !isStringLiteralLike(indexExpression)) {
                    error(indexExpression, Diagnostics.A_const_enum_member_can_only_be_accessed_using_a_string_literal);
                    return errorType;
                }
                const effectiveIndexType = isForInVariableForNumericPropertyNames(indexExpression) ? numberType : indexType;
                const accessFlags = isAssignmentTarget(node) ? 4 /* Writing */ | (isGenericObjectType(objectType) && !isThisTypeParameter(objectType) ? 2 /* NoIndexSignatures */ : 0) : 32 /* ExpressionPosition */;
                const indexedAccessType = getIndexedAccessTypeOrUndefined(objectType, effectiveIndexType, accessFlags, node) || errorType;
                return checkIndexedAccessIndexType(getFlowTypeOfAccessExpression(node, getNodeLinks(node).resolvedSymbol, indexedAccessType, indexExpression, checkMode), node);
            }