function isEmptyResolvedType(t) {
                return t !== anyFunctionType && t.properties.length === 0 && t.callSignatures.length === 0 && t.constructSignatures.length === 0 && t.indexInfos.length === 0;
            }