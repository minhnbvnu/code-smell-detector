function getGlobalTemplateStringsArrayType() {
                return deferredGlobalTemplateStringsArrayType || (deferredGlobalTemplateStringsArrayType = getGlobalType("TemplateStringsArray", 
                /*arity*/
                0, 
                /*reportErrors*/
                true) || emptyObjectType);
            }