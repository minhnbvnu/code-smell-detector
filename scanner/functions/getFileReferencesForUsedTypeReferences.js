function getFileReferencesForUsedTypeReferences() {
                    return necessaryTypeReferences ? mapDefined(arrayFrom(necessaryTypeReferences.keys()), getFileReferenceForSpecifierModeTuple) : [];
                }