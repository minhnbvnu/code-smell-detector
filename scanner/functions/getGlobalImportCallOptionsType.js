function getGlobalImportCallOptionsType(reportErrors2) {
                return deferredGlobalImportCallOptionsType || (deferredGlobalImportCallOptionsType = getGlobalType("ImportCallOptions", 
                /*arity*/
                0, reportErrors2)) || emptyObjectType;
            }