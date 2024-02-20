function getGlobalGeneratorType(reportErrors2) {
                return deferredGlobalGeneratorType || (deferredGlobalGeneratorType = getGlobalType("Generator", 
                /*arity*/
                3, reportErrors2)) || emptyGenericType;
            }