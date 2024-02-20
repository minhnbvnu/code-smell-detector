function indexInfoRelatedTo(sourceInfo, targetInfo, reportErrors2, intersectionState) {
                    const related = isRelatedTo(sourceInfo.type, targetInfo.type, 3 /* Both */, reportErrors2, 
                    /*headMessage*/
                    void 0, intersectionState);
                    if (!related && reportErrors2) {
                        if (sourceInfo.keyType === targetInfo.keyType) {
                            reportError(Diagnostics._0_index_signatures_are_incompatible, typeToString(sourceInfo.keyType));
                        }
                        else {
                            reportError(Diagnostics._0_and_1_index_signatures_are_incompatible, typeToString(sourceInfo.keyType), typeToString(targetInfo.keyType));
                        }
                    }
                    return related;
                }