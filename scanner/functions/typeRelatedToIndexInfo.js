function typeRelatedToIndexInfo(source2, targetInfo, reportErrors2, intersectionState) {
                    const sourceInfo = getApplicableIndexInfo(source2, targetInfo.keyType);
                    if (sourceInfo) {
                        return indexInfoRelatedTo(sourceInfo, targetInfo, reportErrors2, intersectionState);
                    }
                    if (!(intersectionState & 1 /* Source */) && (relation !== strictSubtypeRelation || getObjectFlags(source2) & 8192 /* FreshLiteral */) && isObjectTypeWithInferableIndex(source2)) {
                        return membersRelatedToIndexInfo(source2, targetInfo, reportErrors2, intersectionState);
                    }
                    if (reportErrors2) {
                        reportError(Diagnostics.Index_signature_for_type_0_is_missing_in_type_1, typeToString(targetInfo.keyType), typeToString(source2));
                    }
                    return 0 /* False */;
                }