function getGlobalImportMetaType() {
                return deferredGlobalImportMetaType || (deferredGlobalImportMetaType = getGlobalType("ImportMeta", 
                /*arity*/
                0, 
                /*reportErrors*/
                true) || emptyObjectType);
            }